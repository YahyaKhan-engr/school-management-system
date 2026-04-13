<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/jwt.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDB();

switch ($method) {
    // GET attendance for a student
    case 'GET':
        $student_id = intval($_GET['student_id'] ?? 0);
        if (!$student_id) {
            echo json_encode(['success' => false, 'message' => 'student_id required']);
            break;
        }
        $stmt = $db->prepare('SELECT * FROM attendance WHERE student_id = ? ORDER BY date DESC');
        $stmt->bind_param('i', $student_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $records = [];
        while ($row = $result->fetch_assoc()) $records[] = $row;
        echo json_encode(['success' => true, 'data' => $records]);
        $stmt->close();
        break;

    // POST - mark attendance (admin only)
    case 'POST':
        $auth = getAuthUser();
        if (!$auth || $auth['role'] !== 'admin') {
            http_response_code(403);
            echo json_encode(['success' => false, 'message' => 'Unauthorized']);
            break;
        }
        $data       = json_decode(file_get_contents('php://input'), true);
        $student_id = intval($data['student_id'] ?? 0);
        $date       = trim($data['date'] ?? '');
        $status     = in_array($data['status'] ?? '', ['Present', 'Absent', 'Late']) ? $data['status'] : 'Present';

        if (!$student_id || empty($date)) {
            echo json_encode(['success' => false, 'message' => 'student_id and date required']);
            break;
        }

        $stmt = $db->prepare('INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE status=?');
        $stmt->bind_param('isss', $student_id, $date, $status, $status);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Attendance marked']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to mark attendance']);
        }
        $stmt->close();
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}

$db->close();

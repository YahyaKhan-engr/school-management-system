<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/jwt.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDB();

switch ($method) {
    // GET results for a student
    case 'GET':
        $student_id = intval($_GET['student_id'] ?? 0);
        if (!$student_id) {
            echo json_encode(['success' => false, 'message' => 'student_id required']);
            break;
        }
        $stmt = $db->prepare('SELECT * FROM results WHERE student_id = ?');
        $stmt->bind_param('i', $student_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $results = [];
        while ($row = $result->fetch_assoc()) $results[] = $row;
        echo json_encode(['success' => true, 'data' => $results]);
        $stmt->close();
        break;

    // POST - upload result (admin only)
    case 'POST':
        $auth = getAuthUser();
        if (!$auth || $auth['role'] !== 'admin') {
            http_response_code(403);
            echo json_encode(['success' => false, 'message' => 'Unauthorized']);
            break;
        }
        $data       = json_decode(file_get_contents('php://input'), true);
        $student_id = intval($data['student_id'] ?? 0);
        $subject    = trim($data['subject'] ?? '');
        $marks      = intval($data['marks'] ?? 0);

        if (!$student_id || empty($subject) || $marks < 0 || $marks > 100) {
            echo json_encode(['success' => false, 'message' => 'Invalid data']);
            break;
        }

        $stmt = $db->prepare('INSERT INTO results (student_id, subject, marks) VALUES (?, ?, ?)');
        $stmt->bind_param('isi', $student_id, $subject, $marks);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Result uploaded']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Upload failed']);
        }
        $stmt->close();
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}

$db->close();

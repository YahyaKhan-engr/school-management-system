<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/jwt.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDB();

switch ($method) {
    // GET all admissions (admin only)
    case 'GET':
        $auth = getAuthUser();
        if (!$auth || $auth['role'] !== 'admin') {
            http_response_code(403);
            echo json_encode(['success' => false, 'message' => 'Unauthorized']);
            break;
        }
        $result = $db->query('SELECT * FROM admissions ORDER BY created_at DESC');
        $admissions = [];
        while ($row = $result->fetch_assoc()) $admissions[] = $row;
        echo json_encode(['success' => true, 'data' => $admissions]);
        break;

    // POST - submit admission (public)
    case 'POST':
        $data    = json_decode(file_get_contents('php://input'), true);
        $name    = trim($data['name'] ?? '');
        $email   = trim($data['email'] ?? '');
        $class   = trim($data['class'] ?? '');
        $message = trim($data['message'] ?? '');

        if (empty($name) || empty($email) || empty($class)) {
            echo json_encode(['success' => false, 'message' => 'Name, email and class are required']);
            break;
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['success' => false, 'message' => 'Invalid email address']);
            break;
        }

        $stmt = $db->prepare('INSERT INTO admissions (name, email, class, message) VALUES (?, ?, ?, ?)');
        $stmt->bind_param('ssss', $name, $email, $class, $message);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Application submitted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Submission failed']);
        }
        $stmt->close();
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}

$db->close();

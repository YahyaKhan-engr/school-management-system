<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/jwt.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDB();

switch ($method) {
    // GET all students
    case 'GET':
        $result = $db->query('SELECT * FROM students ORDER BY id DESC');
        $students = [];
        while ($row = $result->fetch_assoc()) $students[] = $row;
        echo json_encode(['success' => true, 'data' => $students]);
        break;

    // POST - add student (admin only)
    case 'POST':
        $auth = getAuthUser();
        if (!$auth || $auth['role'] !== 'admin') {
            http_response_code(403);
            echo json_encode(['success' => false, 'message' => 'Unauthorized']);
            break;
        }
        $data  = json_decode(file_get_contents('php://input'), true);
        $name  = trim($data['name'] ?? '');
        $email = trim($data['email'] ?? '');
        $class = trim($data['class'] ?? '');

        if (empty($name) || empty($email) || empty($class)) {
            echo json_encode(['success' => false, 'message' => 'All fields required']);
            break;
        }
        $stmt = $db->prepare('INSERT INTO students (name, email, class) VALUES (?, ?, ?)');
        $stmt->bind_param('sss', $name, $email, $class);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Student added', 'id' => $stmt->insert_id]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to add student']);
        }
        $stmt->close();
        break;

    // PUT - update student
    case 'PUT':
        $auth = getAuthUser();
        if (!$auth || $auth['role'] !== 'admin') {
            http_response_code(403);
            echo json_encode(['success' => false, 'message' => 'Unauthorized']);
            break;
        }
        $id    = intval($_GET['id'] ?? 0);
        $data  = json_decode(file_get_contents('php://input'), true);
        $name  = trim($data['name'] ?? '');
        $email = trim($data['email'] ?? '');
        $class = trim($data['class'] ?? '');

        if (!$id || empty($name) || empty($email) || empty($class)) {
            echo json_encode(['success' => false, 'message' => 'Invalid data']);
            break;
        }
        $stmt = $db->prepare('UPDATE students SET name=?, email=?, class=? WHERE id=?');
        $stmt->bind_param('sssi', $name, $email, $class, $id);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Student updated']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Update failed']);
        }
        $stmt->close();
        break;

    // DELETE - remove student
    case 'DELETE':
        $auth = getAuthUser();
        if (!$auth || $auth['role'] !== 'admin') {
            http_response_code(403);
            echo json_encode(['success' => false, 'message' => 'Unauthorized']);
            break;
        }
        $id = intval($_GET['id'] ?? 0);
        if (!$id) {
            echo json_encode(['success' => false, 'message' => 'Invalid ID']);
            break;
        }
        $stmt = $db->prepare('DELETE FROM students WHERE id=?');
        $stmt->bind_param('i', $id);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Student deleted']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Delete failed']);
        }
        $stmt->close();
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}

$db->close();

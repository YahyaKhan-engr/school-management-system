<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$data     = json_decode(file_get_contents('php://input'), true);
$name     = trim($data['name'] ?? '');
$email    = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');
$role     = in_array($data['role'] ?? '', ['admin', 'student']) ? $data['role'] : 'student';

// Validation
if (empty($name) || empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}
if (strlen($password) < 6) {
    echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters']);
    exit;
}

$db = getDB();

// Check if email already exists
$stmt = $db->prepare('SELECT id FROM users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    $stmt->close();
    $db->close();
    echo json_encode(['success' => false, 'message' => 'Email already registered']);
    exit;
}
$stmt->close();

// Hash password and insert
$hashed = password_hash($password, PASSWORD_BCRYPT);
$stmt = $db->prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)');
$stmt->bind_param('ssss', $name, $email, $hashed, $role);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Registration successful']);
} else {
    echo json_encode(['success' => false, 'message' => 'Registration failed']);
}

$stmt->close();
$db->close();

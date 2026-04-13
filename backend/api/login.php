<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/jwt.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get JSON body
$data = json_decode(file_get_contents('php://input'), true);
$email    = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

// Validate input
if (empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Email and password are required']);
    exit;
}

$db = getDB();

// Fetch user by email
$stmt = $db->prepare('SELECT id, name, email, password, role FROM users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$stmt->close();
$db->close();

if (!$user || !password_verify($password, $user['password'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
    exit;
}

// Generate token
$token = generateToken([
    'id'    => $user['id'],
    'email' => $user['email'],
    'role'  => $user['role'],
    'exp'   => time() + 86400 // 24 hours
]);

unset($user['password']); // Never send password back

echo json_encode([
    'success' => true,
    'message' => 'Login successful',
    'user'    => $user,
    'token'   => $token
]);

<?php
// Database configuration
// Local (XAMPP): uses localhost defaults
// Production (InfinityFree/cPanel): set these to your hosting DB credentials

$isLocal = in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost', '127.0.0.1']);

if ($isLocal) {
    define('DB_HOST', 'localhost');
    define('DB_USER', 'root');
    define('DB_PASS', '');
    define('DB_NAME', 'school_db');
} else {
    // ⚠️ Replace these with your InfinityFree / cPanel DB credentials
    define('DB_HOST', getenv('DB_HOST') ?: 'sql.infinityfree.com');
    define('DB_USER', getenv('DB_USER') ?: 'YOUR_DB_USER');
    define('DB_PASS', getenv('DB_PASS') ?: 'YOUR_DB_PASS');
    define('DB_NAME', getenv('DB_NAME') ?: 'YOUR_DB_NAME');
}

function getDB() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Database connection failed']);
        exit;
    }
    $conn->set_charset('utf8mb4');
    return $conn;
}

<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';

// Test DB connection
$db = getDB();
$db->close();

echo json_encode([
    'success' => true,
    'message' => 'Backend is running',
    'php'     => PHP_VERSION,
    'db'      => 'Connected to ' . DB_NAME,
    'time'    => date('Y-m-d H:i:s'),
]);

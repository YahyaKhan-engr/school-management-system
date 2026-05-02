<?php
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// Allow localhost (dev) and any *.vercel.app domain (production)
if (
    preg_match('/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/', $origin) ||
    preg_match('/^https:\/\/.*\.vercel\.app$/', $origin) ||
    preg_match('/^https:\/\/.*\.up\.railway\.app$/', $origin)
) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: *");
}

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

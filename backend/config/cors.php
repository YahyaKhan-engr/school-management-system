<?php
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

$allowed = [
    // Local dev
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    // ⚠️ Replace with your actual Vercel URL after deploying frontend
    'https://school-management-system.vercel.app',
    'https://school-management-system-yahyakhan-engr.vercel.app',
];

if (in_array($origin, $allowed) || preg_match('/^https:\/\/.*\.vercel\.app$/', $origin) || preg_match('/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/', $origin)) {
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

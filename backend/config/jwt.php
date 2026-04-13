<?php
define('JWT_SECRET', 'intlschool_secret_key_2026');

/**
 * Generate a simple JWT token
 */
function generateToken($payload) {
    $header = base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload = base64_encode(json_encode($payload));
    $signature = base64_encode(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));
    return "$header.$payload.$signature";
}

/**
 * Verify and decode a JWT token
 */
function verifyToken($token) {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return false;
    [$header, $payload, $signature] = $parts;
    $expectedSig = base64_encode(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));
    if ($signature !== $expectedSig) return false;
    return json_decode(base64_decode($payload), true);
}

/**
 * Get authenticated user from Authorization header
 */
function getAuthUser() {
    $headers = getallheaders();
    $auth = $headers['Authorization'] ?? '';
    if (!str_starts_with($auth, 'Bearer ')) return null;
    $token = substr($auth, 7);
    return verifyToken($token);
}

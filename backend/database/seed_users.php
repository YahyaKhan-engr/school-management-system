<?php
/**
 * Run this script ONCE via browser: http://localhost/school-backend/database/seed_users.php
 * It inserts demo admin and student accounts with correct bcrypt hashes.
 */
require_once __DIR__ . '/../config/db.php';

$users = [
    ['Admin User',   'admin@school.edu',   'admin123',   'admin'],
    ['John Student', 'student@school.edu', 'student123', 'student'],
];

$db = getDB();
$inserted = 0;

foreach ($users as [$name, $email, $password, $role]) {
    // Skip if already exists
    $check = $db->prepare('SELECT id FROM users WHERE email = ?');
    $check->bind_param('s', $email);
    $check->execute();
    $check->store_result();
    if ($check->num_rows > 0) {
        echo "⚠️  Skipped (already exists): $email<br>";
        $check->close();
        continue;
    }
    $check->close();

    $hash = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $db->prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)');
    $stmt->bind_param('ssss', $name, $email, $hash, $role);
    if ($stmt->execute()) {
        echo "✅ Inserted: $email (password: $password)<br>";
        $inserted++;
    } else {
        echo "❌ Failed: $email<br>";
    }
    $stmt->close();
}

$db->close();
echo "<br><strong>Done. $inserted user(s) inserted.</strong>";
echo "<br><br>You can now login at <a href='http://localhost:5173/login'>http://localhost:5173/login</a>";

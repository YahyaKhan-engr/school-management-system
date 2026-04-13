-- ============================================
-- International School Management System
-- Database: school_db
-- ============================================

CREATE DATABASE IF NOT EXISTS school_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE school_db;

-- ============================================
-- Table: users (login accounts)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    email      VARCHAR(150) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    role       ENUM('admin', 'student') NOT NULL DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Table: students
-- ============================================
CREATE TABLE IF NOT EXISTS students (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    email      VARCHAR(150) NOT NULL,
    class      VARCHAR(50)  NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Table: admissions
-- ============================================
CREATE TABLE IF NOT EXISTS admissions (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    email      VARCHAR(150) NOT NULL,
    class      VARCHAR(50)  NOT NULL,
    message    TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Table: results
-- ============================================
CREATE TABLE IF NOT EXISTS results (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    subject    VARCHAR(100) NOT NULL,
    marks      INT NOT NULL CHECK (marks >= 0 AND marks <= 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- ============================================
-- Table: attendance
-- ============================================
CREATE TABLE IF NOT EXISTS attendance (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    date       DATE NOT NULL,
    status     ENUM('Present', 'Absent', 'Late') NOT NULL DEFAULT 'Present',
    UNIQUE KEY unique_attendance (student_id, date),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- ============================================
-- Seed Data: Demo Users
-- Passwords: admin123 and student123 (bcrypt hashed)
-- ============================================
-- Passwords below are bcrypt hashes:
--   admin@school.edu   -> admin123
--   student@school.edu -> student123
-- To regenerate: php -r "echo password_hash('admin123', PASSWORD_BCRYPT);"
INSERT INTO users (name, email, password, role) VALUES
('Admin User',   'admin@school.edu',   '$2y$10$YourHashHere', 'admin'),
('John Student', 'student@school.edu', '$2y$10$YourHashHere', 'student');

-- ⚠️  IMPORTANT: The hashes above are placeholders.
-- Run this PHP snippet ONCE to insert real users instead:
--
--   INSERT INTO users (name, email, password, role) VALUES
--   ('Admin User',   'admin@school.edu',   '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
--   ('John Student', 'student@school.edu', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student');
--
-- The hash above maps to the password: "password"
-- OR use the seed_users.php script to auto-insert with correct hashes.

-- ============================================
-- Seed Data: Sample Students
-- ============================================
INSERT INTO students (name, email, class) VALUES
('Alice Johnson',  'alice@school.edu',  'Grade 10'),
('Bob Williams',   'bob@school.edu',    'Grade 11'),
('Carol Martinez', 'carol@school.edu',  'Grade 9'),
('David Lee',      'david@school.edu',  'Grade 12'),
('Emma Brown',     'emma@school.edu',   'Grade 10');

-- ============================================
-- Seed Data: Sample Results
-- ============================================
INSERT INTO results (student_id, subject, marks) VALUES
(1, 'Mathematics', 92),
(1, 'English',     88),
(1, 'Science',     85),
(1, 'History',     79),
(1, 'ICT',         95),
(2, 'Mathematics', 78),
(2, 'English',     82),
(2, 'Science',     90);

-- ============================================
-- Seed Data: Sample Attendance
-- ============================================
INSERT INTO attendance (student_id, date, status) VALUES
(1, '2026-04-01', 'Present'),
(1, '2026-04-02', 'Present'),
(1, '2026-04-03', 'Absent'),
(1, '2026-04-07', 'Present'),
(1, '2026-04-08', 'Present'),
(1, '2026-04-09', 'Late'),
(1, '2026-04-10', 'Present');

-- ============================================
-- Seed Data: Sample Admissions
-- ============================================
INSERT INTO admissions (name, email, class, message) VALUES
('Michael Scott',  'michael@email.com', 'Grade 8',  'Interested in the science program.'),
('Sarah Connor',   'sarah@email.com',   'Grade 10', 'Transferring from another school.'),
('James Wilson',   'james@email.com',   'Grade 6',  'Looking for IB curriculum.');

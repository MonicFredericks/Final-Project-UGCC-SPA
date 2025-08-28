CREATE DATABASE IF NOT EXISTS ugcc CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ugcc;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profiles (
  user_id INT PRIMARY KEY,
  student_id VARCHAR(50),
  program VARCHAR(100),
  phone VARCHAR(30),
  bio TEXT,
  avatar_url VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS executives (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL,
  term_start DATE NOT NULL,
  term_end DATE NOT NULL,
  photo_url VARCHAR(255),
  email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  location VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS interests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100),
  last_name  VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(30),
  program VARCHAR(100),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO executives(full_name, role, term_start, term_end, photo_url, email)
VALUES
 ('Jane Doe','President','2025-05-01','2026-04-30',NULL,'jane.doe@ug.edu');

INSERT INTO activities(title, description, start_date, location)
VALUES
 ('Ransomware Awareness Talk','Club session on ransomware defense','2025-09-20','LT1');

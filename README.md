# Student Management System

A simple student management system that allows storing and managing student information using MySQL database.

## Setup Instructions

1. Install MySQL Workbench and create a new database:
```sql
CREATE DATABASE student_management;
```
```sql
USE student_management;
```

2. Create the necessary tables using the following SQL commands in MySQL Workbench:
```sql
CREATE TABLE students (
    student_id VARCHAR(10) PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    enrollment_date DATE,
    program_name VARCHAR(100),
    current_semester INT,
    cgpa DECIMAL(3,2),
    class_section VARCHAR(10),
    fee_status VARCHAR(10),
    guardian_name VARCHAR(100),
    guardian_relationship VARCHAR(50),
    guardian_phone VARCHAR(15),
    guardian_email VARCHAR(100),
    extracurricular_activities TEXT
);
```

3. Start the application by opening `index.html` in a web browser.

## Features

- Add new student records with basic and optional information
- View all student records in a table format
- Edit existing student records
- Delete student records
- CGPA calculation on 10-point scale
- Responsive design

## Required Fields (Basic Information)
- First Name
- Last Name
- Date of Birth
- Gender
- Phone
- Email
- Address
- Student ID

All other fields are optional and can be filled in later.

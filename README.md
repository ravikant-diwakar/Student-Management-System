# Student Management System

Welcome to the Student Management System! This project allows you to manage student information easily using a MySQL database. It supports adding, viewing, editing, and deleting student records.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setup Instructions](#setup-instructions)
3. [Folder Structure](#folder-structure)
4. [Features](#features)
5. [How to Run the Application](#how-to-run-the-application)
6. [Screenshots](#Screenshots)

---

## Prerequisites

Before setting up the project, make sure you have the following installed on your system:
1. **MySQL Workbench**: A tool to manage MySQL databases. 
2. **Node.js and npm (Node Package Manager)**
   - Download Node.js (npm comes bundled with it) 
   - Verify installation by running `node -v` and `npm -v` in your terminal.
3. **Text Editor**: Use any text editor to edit the code files. Some popular choices are:
    - Visual Studio Code

> [!NOTE]
> Ensure you have Node.js and MySQL installed before proceeding with the setup. These are the foundation for the backend and database functionality.

---

## Setup Instructions

### Step 1: Install MySQL and Create the Database

1. Install **MySQL Workbench** if you haven't already.
2. Open MySQL Workbench, and connect to your MySQL server.
3. Run the following commands to create the database and necessary tables:

   ```sql
   CREATE DATABASE student_management;
   ```
   ```sql
   USE student_management;
   ```

4. Then, create the `students` table by running this SQL code:

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

### Step 2: Initialize the Project

Now, let’s set up the project files.

1. Open a terminal and create a new project directory:

   ```bash
   mkdir student-management
   cd student-management
   ```

2. Initialize a new Node.js project by running:

   ```bash
   npm init -y
   ```

3. Install the required dependencies:

   ```bash
   npm install express mysql
   npm install cors
   ```

> [!IMPORTANT]
> Do not skip the installation of dependencies. These libraries are crucial for setting up the backend server and MySQL connection.

---

## Folder Structure

The project directory will look like this:

```
Student-Management-System/
│
├── node_modules/                  # Installed dependencies (auto-created by npm install)
├── public/                         # Static files (HTML, CSS, JS)
│   ├── index.html                  # Main HTML file
│   ├── styles.css                  # CSS for styling
│   └── script.js                   # JavaScript file for frontend functionality
├── server.js                       # Backend server code
├── package.json                    # Project metadata and dependencies
└── package-lock.json               # Lock file for dependency versions
```

> [!NOTE]
> server.js is the backend server code that connects to MySQL and handles API requests. Ensure this file is properly configured before starting the server.

---

## Features

- [x] **Add New Students**: Add new student records with both basic and optional information.
- [x] **View All Students**: View all the student records in a table format.
- [x] **Edit Students**: Edit existing student records.
- [x] **Delete Students**: Remove student records from the database.
- [x] **Responsive Design**: The application is mobile-friendly and works well on any device.

### Required Fields (Basic Information)

When adding a student, the following fields are required:
- First Name
- Last Name
- Date of Birth
- Gender
- Phone
- Email
- Address
- Student ID

Other fields are optional and can be filled in later.

---

## How to Run the Application

### Step 1: Create the Backend Server

1. Open a new file called `server.js` in the project directory.
2. Paste the following code to set up the backend server using Express and MySQL:

   ```js
   const express = require('express');
   const mysql = require('mysql');
   const cors = require('cors');

   const app = express();
   const port = 3000;

   // Database connection
   const db = mysql.createConnection({
       host: 'localhost',
       user: 'root',  // change this based on your MySQL credentials
       password: '',  // change this based on your MySQL password
       database: 'student_management'
   });

   db.connect((err) => {
       if (err) throw err;
       console.log('Connected to MySQL database');
   });

   // Middleware
   app.use(cors());
   app.use(express.json());
   app.use(express.static('public'));

   // API routes for managing student records
   // Add more routes for functionality like add, view, edit, delete students.

   // Start the server
   app.listen(port, () => {
       console.log(`Server is running on http://localhost:${port}`);
   });
   ```

### Step 2: Run the Application

1. Start your backend server by running the following command in your terminal:

   ```bash
   node server.js
   ```

2. Now, open `public/index.html` in a browser to see the front-end interface.

## Screenshots

![image](https://github.com/user-attachments/assets/8e561d64-dc04-40f9-b7c8-670e8f53f665)

![image](https://github.com/user-attachments/assets/675b3c27-5231-4431-a79a-bc0ca5aa0cf2)

![image](https://github.com/user-attachments/assets/23bec738-15c5-4104-bdc3-486674e5f650)




---


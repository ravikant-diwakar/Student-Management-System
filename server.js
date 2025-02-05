const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static('public'));

// MySQL Connection Configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'Password', // Replace with your MySQL password
    database: 'student_management'
});

// Connect to MySQL
connection.connect(error => {
    if (error) throw error;
    console.log('Successfully connected to the database.');
});

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Endpoints

// Get all students
app.get('/api/students', (req, res) => {
    connection.query('SELECT * FROM students', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Add new student
app.post('/api/students', (req, res) => {
    const student = req.body;
    connection.query('INSERT INTO students SET ?', student, (error, results) => {
        if (error) throw error;
        res.json({ message: 'Student added successfully', id: results.insertId });
    });
});

// Update student
app.put('/api/students/:id', (req, res) => {
    const student = req.body;
    connection.query('UPDATE students SET ? WHERE student_id = ?', 
        [student, req.params.id], 
        (error, results) => {
            if (error) throw error;
            res.json({ message: 'Student updated successfully' });
    });
});

// Delete student
app.delete('/api/students/:id', (req, res) => {
    connection.query('DELETE FROM students WHERE student_id = ?', 
        [req.params.id], 
        (error, results) => {
            if (error) throw error;
            res.json({ message: 'Student deleted successfully' });
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

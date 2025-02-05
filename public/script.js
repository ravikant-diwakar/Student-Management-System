// Store students data
let students = [];
let editingId = null;

// DOM Elements
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');
const submitBtn = document.getElementById('submitBtn');

// Load existing data when page loads
loadStudents();

// Form submission handler
studentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const studentData = {
        student_id: document.getElementById('studentId').value,
        first_name: document.getElementById('firstName').value,
        last_name: document.getElementById('lastName').value,
        date_of_birth: document.getElementById('dob').value,
        gender: document.getElementById('gender').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        enrollment_date: document.getElementById('enrollmentDate').value || null,
        program_name: document.getElementById('programName').value || null,
        current_semester: document.getElementById('semester').value || null,
        cgpa: document.getElementById('cgpa').value || null,
        class_section: document.getElementById('section').value || null,
        guardian_name: document.getElementById('guardianName').value || null,
        guardian_relationship: document.getElementById('guardianRelation').value || null,
        guardian_phone: document.getElementById('guardianPhone').value || null,
        guardian_email: document.getElementById('guardianEmail').value || null,
        extracurricular_activities: document.getElementById('activities').value || null
    };

    try {
        if (editingId) {
            await updateStudent(studentData);
        } else {
            await addStudent(studentData);
        }

        studentForm.reset();
        editingId = null;
        submitBtn.textContent = 'Add Student';
        loadStudents(); // Reload the table
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

async function addStudent(student) {
    const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student)
    });

    if (!response.ok) {
        throw new Error('Failed to add student');
    }

    await loadStudents();
}

async function updateStudent(student) {
    const response = await fetch(`/api/students/${editingId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student)
    });

    if (!response.ok) {
        throw new Error('Failed to update student');
    }

    await loadStudents();
}

async function deleteStudent(studentId) {
    if (confirm('Are you sure you want to delete this student?')) {
        const response = await fetch(`/api/students/${studentId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete student');
        }

        await loadStudents();
    }
}

function editStudent(studentId) {
    const student = students.find(s => s.student_id === studentId);
    if (student) {
        editingId = studentId;
        submitBtn.textContent = 'Update Student';

        // Fill form with student data
        document.getElementById('studentId').value = student.student_id;
        document.getElementById('firstName').value = student.first_name;
        document.getElementById('lastName').value = student.last_name;
        document.getElementById('dob').value = student.date_of_birth.split('T')[0];
        document.getElementById('gender').value = student.gender;
        document.getElementById('phone').value = student.phone;
        document.getElementById('email').value = student.email;
        document.getElementById('address').value = student.address;
        document.getElementById('enrollmentDate').value = student.enrollment_date ? student.enrollment_date.split('T')[0] : '';
        document.getElementById('programName').value = student.program_name || '';
        document.getElementById('semester').value = student.current_semester || '';
        document.getElementById('cgpa').value = student.cgpa || '';
        document.getElementById('section').value = student.class_section || '';
        document.getElementById('guardianName').value = student.guardian_name || '';
        document.getElementById('guardianRelation').value = student.guardian_relationship || '';
        document.getElementById('guardianPhone').value = student.guardian_phone || '';
        document.getElementById('guardianEmail').value = student.guardian_email || '';
        document.getElementById('activities').value = student.extracurricular_activities || '';
    }
}

function displayStudents() {
    studentTableBody.innerHTML = '';
    
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.student_id}</td>
            <td>${student.first_name} ${student.last_name}<br>
                <small>DOB: ${new Date(student.date_of_birth).toLocaleDateString()}<br>Gender: ${student.gender}</small></td>
            <td>${student.phone}<br>${student.email}<br>
                <small>${student.address}</small></td>
            <td>${student.program_name || 'N/A'}<br>
                CGPA: ${student.cgpa || 'N/A'}<br>
                Semester: ${student.current_semester || 'N/A'}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editStudent('${student.student_id}')">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteStudent('${student.student_id}')">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

async function loadStudents() {
    try {
        const response = await fetch('/api/students');
        if (!response.ok) {
            throw new Error('Failed to load students');
        }
        students = await response.json();
        displayStudents();
    } catch (error) {
        console.error('Error loading students:', error);
        alert('Error loading students: ' + error.message);
    }
}
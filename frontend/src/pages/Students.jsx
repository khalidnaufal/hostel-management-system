import React, { useState, useEffect } from 'react';
import api from '../services/api';
import StudentModal from '../components/StudentModal';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const { data } = await api.get('/students');
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleAddStudent = async (studentData) => {
        try {
            await api.post('/students', studentData);
            fetchStudents();
            setIsModalOpen(false);
        } catch (error) {
            alert('Error adding student: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await api.delete(`/students/${id}`);
                fetchStudents();
            } catch (error) {
                alert('Error deleting student: ' + error.message);
            }
        }
    };

    return (
        <div className="page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Students Management</h2>
                <button className="btn" onClick={() => setIsModalOpen(true)}>+ Add Student</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Student ID</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Room</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length === 0 ? (
                        <tr><td colSpan="6" style={{ textAlign: 'center' }}>No students found</td></tr>
                    ) : (
                        students.map(student => (
                            <tr key={student._id}>
                                <td>{student.name}</td>
                                <td>{student.studentId}</td>
                                <td>{student.email}</td>
                                <td>{student.phone}</td>
                                <td>{student.roomNumber || <span className="badge warning">Unassigned</span>}</td>
                                <td>
                                    <button
                                        className="btn"
                                        style={{ background: '#ef4444', padding: '6px 12px', fontSize: '0.8rem' }}
                                        onClick={() => handleDelete(student._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <StudentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddStudent}
            />
        </div>
    );
};

export default Students;

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, UserPlus } from 'lucide-react';
import './StudentModal.css';

const StudentModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        full_name: '',
        studentId: `ST-${Math.floor(1000 + Math.random() * 9000)}`,
        username: '',
        phone: '',
        room_number: ''
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
        setFormData({ 
            full_name: '', 
            studentId: `ST-${Math.floor(1000 + Math.random() * 9000)}`, 
            username: '', 
            phone: '', 
            room_number: '' 
        });
    };

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, fontWeight: 700, color: 'var(--text-main)', fontSize: '1.25rem' }}>
                        <UserPlus size={20} color="var(--primary)" /> Add New Student
                    </h3>
                    <button className="icon-btn" onClick={onClose} style={{ border: 'none' }}>
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Student ID</label>
                            <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Room Number (Optional)</label>
                            <input type="text" name="room_number" value={formData.room_number} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn primary" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>Save Student</button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default StudentModal;

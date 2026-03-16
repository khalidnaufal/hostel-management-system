import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, PlusSquare } from 'lucide-react';

const RoomModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        roomNumber: '',
        capacity: 1,
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
        setFormData({ roomNumber: '', capacity: 1 });
    };

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, fontWeight: 700, color: 'var(--text-main)', fontSize: '1.25rem' }}>
                        <PlusSquare size={20} color="var(--primary)" /> Add New Room
                    </h3>
                    <button className="icon-btn" onClick={onClose} style={{ border: 'none' }}>
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Room Number</label>
                            <input 
                                type="text" 
                                name="roomNumber" 
                                value={formData.roomNumber} 
                                onChange={handleChange} 
                                required 
                                placeholder="e.g. 101"
                            />
                        </div>
                        <div className="form-group">
                            <label>Capacity</label>
                            <input 
                                type="number" 
                                name="capacity" 
                                value={formData.capacity} 
                                onChange={handleChange} 
                                required 
                                min="1"
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn primary" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>Save Room</button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default RoomModal;

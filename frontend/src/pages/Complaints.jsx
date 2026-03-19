import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { CheckCircle, Clock, User } from 'lucide-react';

const Complaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const { data } = await api.get('/complaints');
            setComplaints(data);
        } catch (error) {
            console.error('Error fetching complaints:', error);
        }
    };

    const handleResolve = async (id) => {
        try {
            setLoading(true);
            await api.put(`/complaints/${id}`, { status: 'Resolved' });
            await fetchComplaints(); // Refresh list
        } catch (error) {
            alert('Error resolving complaint: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <div className="page-header">
                <h2>Complaints Management</h2>
            </div>
            
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.length === 0 ? (
                            <tr><td colSpan="5" style={{ textAlign: 'center', padding: '32px' }}>No complaints found</td></tr>
                        ) : (
                            complaints.map(complaint => (
                                <tr key={complaint.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: 'var(--primary)' }}>
                                                <User size={16} style={{ margin: 'auto' }} />
                                            </div>
                                            <span className="badge info" style={{ fontWeight: 700 }}>{complaint.student_id}</span>
                                        </div>
                                    </td>
                                    <td style={{ maxWidth: '400px' }}>
                                        <div style={{ fontWeight: 500, color: 'var(--text-main)' }}>
                                            {complaint.description}
                                        </div>
                                    </td>
                                    <td style={{ color: 'var(--text-muted)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <Clock size={14} />
                                            {new Date(complaint.created_at).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge ${complaint.status === 'Resolved' ? 'success' : 'warning'}`}>
                                            {complaint.status}
                                        </span>
                                    </td>
                                    <td>
                                        {complaint.status !== 'Resolved' && (
                                            <button 
                                                className="btn" 
                                                onClick={() => handleResolve(complaint.id)}
                                                disabled={loading}
                                                style={{ padding: '8px 16px', fontSize: '0.85rem', backgroundColor: '#10B981', color: 'white', borderRadius: 8 }}
                                            >
                                                <CheckCircle size={14} /> Resolve
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Complaints;


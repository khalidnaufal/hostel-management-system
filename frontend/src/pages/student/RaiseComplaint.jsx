import React, { useState, useEffect } from 'react';
import { Send, Loader2, Clock, AlertCircle } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const RaiseComplaint = () => {
    const { student } = useAuth();
    const [complaints, setComplaints] = useState([]);
    const [form, setForm] = useState({ category: '', description: '' });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (student?.student_id) {
            fetchMyComplaints();
        }
    }, [student]);

    const fetchMyComplaints = async () => {
        try {
            setFetching(true);
            const { data } = await api.get('/complaints');
            // Filter complaints for this specific student
            const myComplaints = data.filter(c => c.student_id === student.student_id);
            setComplaints(myComplaints);
        } catch (err) {
            console.error('Error fetching complaints:', err);
        } finally {
            setFetching(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!student?.student_id) {
            setError('Student profile not found. Please log in again.');
            return;
        }

        setError('');
        setLoading(true);
        try {
            const complaintData = {
                student_id: student.student_id,
                description: `[${form.category}] ${form.description}`,
                status: 'Pending'
            };

            await api.post('/complaints', complaintData);
            
            setForm({ category: '', description: '' });
            setSubmitted(true);
            fetchMyComplaints(); // Refresh history
            setTimeout(() => setSubmitted(false), 3000);
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || 'Failed to submit complaint. Please try again.';
            setError(errorMsg);
            console.error('Complaint Submission Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page" style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div className="page-header">
                <h2>📝 Raise a Complaint</h2>
            </div>

            <div className="complaint-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1.5fr', gap: 32 }}>
                {/* Submit Form */}
                <div className="card" style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: 28, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', height: 'fit-content' }}>
                    <h3 style={{ margin: '0 0 20px', fontSize: '1.1rem', fontWeight: 700 }}>New Complaint</h3>
                    
                    {submitted && (
                        <div className="success-alert" style={{ background: '#D1FAE5', color: '#065F46', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: 20, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <Send size={16} /> Submitted successfully!
                        </div>
                    )}

                    {error && (
                        <div className="error-alert" style={{ background: '#FEE2E2', color: '#991B1B', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: 20, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <AlertCircle size={16} /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group" style={{ marginBottom: 20 }}>
                            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 8, color: 'var(--text-muted)' }}>Category</label>
                            <select
                                value={form.category}
                                onChange={e => setForm({ ...form, category: e.target.value })}
                                required
                                style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', outline: 'none', background: '#F9FAFB' }}
                            >
                                <option value="">Select Category</option>
                                <option>Plumbing</option>
                                <option>Electrical</option>
                                <option>Cleanliness</option>
                                <option>Wi-Fi</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="form-group" style={{ marginBottom: 24 }}>
                            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 8, color: 'var(--text-muted)' }}>Description</label>
                            <textarea
                                value={form.description}
                                onChange={e => setForm({ ...form, description: e.target.value })}
                                required
                                rows={5}
                                placeholder="Describe your issue in detail..."
                                style={{ width: '100%', padding: '12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', resize: 'none', outline: 'none', background: '#F9FAFB' }}
                            />
                        </div>
                        <button type="submit" className="btn primary" disabled={loading} style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-md)', fontWeight: 700 }}>
                            {loading ? <Loader2 className="spin" size={20} /> : <><Send size={18} /> Send Complaint</>}
                        </button>
                    </form>
                </div>

                {/* History Table */}
                <div className="card" style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                    <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Complaint History</h3>
                        {fetching && <Loader2 className="spin" size={18} color="var(--primary)" />}
                    </div>
                    <div className="table-container" style={{ margin: 0, border: 'none', borderRadius: 0 }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fetching ? (
                                    <tr><td colSpan="3" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading history...</td></tr>
                                ) : complaints.length === 0 ? (
                                    <tr><td colSpan="3" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No complaints raised yet.</td></tr>
                                ) : (
                                    complaints.map(c => (
                                        <tr key={c.id}>
                                            <td style={{ fontSize: '0.9rem', fontWeight: 500, maxWidth: '400px' }}>
                                                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.description}</div>
                                            </td>
                                            <td>
                                                <span className={`badge ${c.status === 'Resolved' ? 'success' : 'warning'}`}>
                                                    {c.status}
                                                </span>
                                            </td>
                                            <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    <Clock size={14} />
                                                    {new Date(c.created_at).toLocaleDateString()}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RaiseComplaint;


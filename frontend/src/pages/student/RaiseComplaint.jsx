import React, { useState } from 'react';
import { Send } from 'lucide-react';

const initialComplaints = [
    { id: 1, category: 'Plumbing', description: 'Water leakage in bathroom', date: '2025-03-15', status: 'Pending' },
    { id: 2, category: 'Electrical', description: 'Fan not working in room', date: '2025-03-10', status: 'Resolved' },
    { id: 3, category: 'Cleanliness', description: 'Common area not cleaned', date: '2025-03-05', status: 'In Progress' },
];

const RaiseComplaint = () => {
    const [complaints, setComplaints] = useState(initialComplaints);
    const [form, setForm] = useState({ category: '', description: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newComplaint = {
            id: complaints.length + 1,
            category: form.category,
            description: form.description,
            date: new Date().toISOString().slice(0, 10),
            status: 'Pending',
        };
        setComplaints([newComplaint, ...complaints]);
        setForm({ category: '', description: '' });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="page">
            <div className="page-header">
                <h2>📝 Raise a Complaint</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 24 }}>
                {/* Complaint Form */}
                <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: 28, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', height: 'fit-content' }}>
                    <h3 style={{ margin: '0 0 20px', fontSize: '1rem', fontWeight: 700 }}>New Complaint</h3>
                    {submitted && (
                        <div style={{ background: '#D1FAE5', color: '#065F46', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: 16, fontWeight: 500, fontSize: '0.9rem' }}>
                            ✓ Complaint submitted successfully!
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group" style={{ marginBottom: 16 }}>
                            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, color: 'var(--text-main)' }}>Category</label>
                            <select
                                value={form.category}
                                onChange={e => setForm({ ...form, category: e.target.value })}
                                required
                                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '0.95rem', outline: 'none', background: '#fff', cursor: 'pointer' }}
                            >
                                <option value="">Select a category</option>
                                <option>Plumbing</option>
                                <option>Electrical</option>
                                <option>Cleanliness</option>
                                <option>Wi-Fi / Internet</option>
                                <option>Furniture</option>
                                <option>Security</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="form-group" style={{ marginBottom: 20 }}>
                            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, color: 'var(--text-main)' }}>Description</label>
                            <textarea
                                value={form.description}
                                onChange={e => setForm({ ...form, description: e.target.value })}
                                required
                                rows={5}
                                placeholder="Describe your issue in detail..."
                                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '0.95rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }}
                            />
                        </div>
                        <button type="submit" className="btn" style={{ width: '100%', justifyContent: 'center' }}>
                            <Send size={16} /> Submit Complaint
                        </button>
                    </form>
                </div>

                {/* Previous Complaints */}
                <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>My Complaints</h3>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map(c => (
                                <tr key={c.id}>
                                    <td style={{ fontWeight: 500 }}>{c.category}</td>
                                    <td style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: 180 }}>
                                        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.description}</div>
                                    </td>
                                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{c.date}</td>
                                    <td>
                                        <span className={`badge ${c.status === 'Resolved' ? 'success' : c.status === 'In Progress' ? 'info' : 'warning'}`}>
                                            {c.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RaiseComplaint;

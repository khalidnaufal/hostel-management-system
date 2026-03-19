import React, { useState } from 'react';
import { Send } from 'lucide-react';

const initialComplaints = [
    { id: 1, category: 'Electrical', description: 'Fan not working', date: '2025-03-15', status: 'Pending' },
    { id: 2, category: 'Plumbing', description: 'Tap leakage', date: '2025-03-10', status: 'Resolved' },
];

const RaiseComplaint = () => {
    const [complaints, setComplaints] = useState(initialComplaints);
    const [form, setForm] = useState({ category: '', description: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newC = {
            id: complaints.length + 1,
            category: form.category,
            description: form.description,
            date: new Date().toISOString().slice(0, 10),
            status: 'Pending',
        };
        setComplaints([newC, ...complaints]);
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
                <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: 28, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', height: 'fit-content' }}>
                    <h3 style={{ margin: '0 0 20px', fontSize: '1rem', fontWeight: 700 }}>Complaint Details</h3>
                    {submitted && (
                        <div style={{ background: '#D1FAE5', color: '#065F46', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: 16, fontWeight: 500 }}>
                            ✓ Submitted successfully!
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group" style={{ marginBottom: 16 }}>
                            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 6 }}>Category</label>
                            <select
                                value={form.category}
                                onChange={e => setForm({ ...form, category: e.target.value })}
                                required
                                style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
                            >
                                <option value="">Select Category</option>
                                <option>Plumbing</option>
                                <option>Electrical</option>
                                <option>Cleanliness</option>
                                <option>Wi-Fi</option>
                            </select>
                        </div>
                        <div className="form-group" style={{ marginBottom: 20 }}>
                            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 6 }}>Description</label>
                            <textarea
                                value={form.description}
                                onChange={e => setForm({ ...form, description: e.target.value })}
                                required
                                rows={5}
                                placeholder="Describe your issue..."
                                style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', resize: 'vertical' }}
                            />
                        </div>
                        <button type="submit" className="btn" style={{ width: '100%' }}>
                            <Send size={16} /> Submit Complaint
                        </button>
                    </form>
                </div>

                <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>History</h3>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map(c => (
                                <tr key={c.id}>
                                    <td style={{ fontWeight: 500 }}>{c.category}</td>
                                    <td style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{c.description}</td>
                                    <td>
                                        <span className={`badge ${c.status === 'Resolved' ? 'success' : 'warning'}`}>
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

import React, { useState } from 'react';
import { CreditCard, CheckCircle, Clock, Download } from 'lucide-react';

const paymentHistory = [
    { id: 'TXN-001', month: 'January 2025', amount: 8500, date: '2025-01-05', status: 'Paid', method: 'UPI' },
    { id: 'TXN-002', month: 'February 2025', amount: 8500, date: '2025-02-03', status: 'Paid', method: 'Net Banking' },
    { id: 'TXN-003', month: 'March 2025', amount: 8500, date: null, status: 'Pending', method: '-' },
];

const PayFees = () => {
    const [paying, setPaying] = useState(false);

    const handlePayNow = () => {
        setPaying(true);
        setTimeout(() => setPaying(false), 2000);
    };

    return (
        <div className="page">
            <div className="page-header">
                <h2>💳 Pay Fees</h2>
            </div>

            {/* Fee Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 28 }}>
                {[
                    { label: 'Monthly Fee', value: '₹8,500', icon: <CreditCard size={24} />, color: '#4F46E5', bg: '#EEF2FF' },
                    { label: 'Last Paid', value: 'Feb 2025', icon: <CheckCircle size={24} />, color: '#065F46', bg: '#D1FAE5' },
                    { label: 'Due This Month', value: '₹8,500', icon: <Clock size={24} />, color: '#92400E', bg: '#FEF3C7' },
                ].map((c, i) => (
                    <div key={i} className="stat-card">
                        <div className="stat-content">
                            <h3>{c.label}</h3>
                            <h2 style={{ fontSize: '1.5rem' }}>{c.value}</h2>
                        </div>
                        <div className="stat-icon" style={{ background: c.bg, color: c.color }}>{c.icon}</div>
                    </div>
                ))}
            </div>

            {/* Pay Now Banner */}
            <div style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' }}>
                <div>
                    <p style={{ margin: '0 0 4px', fontSize: '0.85rem', opacity: 0.8 }}>Due for March 2025</p>
                    <h2 style={{ margin: 0, fontSize: '2rem', color: '#fff' }}>₹8,500</h2>
                    <p style={{ margin: '4px 0 0', fontSize: '0.8rem', opacity: 0.7 }}>Due by: 10 March 2025</p>
                </div>
                <button
                    onClick={handlePayNow}
                    style={{ background: '#fff', color: '#4F46E5', border: 'none', borderRadius: 'var(--radius-md)', padding: '14px 28px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    {paying ? '✓ Processing...' : 'Pay Now →'}
                </button>
            </div>

            {/* Payment History */}
            <div className="table-container" style={{ marginTop: 0 }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Payment History</h3>
                    <button className="btn" style={{ background: 'transparent', color: 'var(--primary)', border: '1px solid var(--primary)', padding: '6px 14px', fontSize: '0.8rem', boxShadow: 'none' }}>
                        <Download size={14} /> Export
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Month</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Method</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory.map((p) => (
                            <tr key={p.id}>
                                <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{p.id}</td>
                                <td style={{ fontWeight: 500 }}>{p.month}</td>
                                <td style={{ fontWeight: 600 }}>₹{p.amount.toLocaleString()}</td>
                                <td style={{ color: 'var(--text-muted)' }}>{p.date || '—'}</td>
                                <td>{p.method}</td>
                                <td>
                                    <span className={`badge ${p.status === 'Paid' ? 'success' : 'warning'}`}>{p.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PayFees;

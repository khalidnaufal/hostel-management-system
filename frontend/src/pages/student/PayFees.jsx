import React, { useState } from 'react';
import { CreditCard, CheckCircle, Clock } from 'lucide-react';

const paymentHistory = [
    { id: 'TXN-001', month: 'January 2025', amount: 8500, date: '2025-01-05', status: 'Paid' },
    { id: 'TXN-002', month: 'February 2025', amount: 8500, date: '2025-02-03', status: 'Paid' },
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 28 }}>
                {[
                    { label: 'Monthly Fee', value: '₹8,500', icon: <CreditCard size={24} />, color: '#4F46E5', bg: '#EEF2FF' },
                    { label: 'Last Paid', value: 'Feb 2025', icon: <CheckCircle size={24} />, color: '#065F46', bg: '#D1FAE5' },
                    { label: 'Due for March', value: '₹8,500', icon: <Clock size={24} />, color: '#92400E', bg: '#FEF3C7' },
                ].map((c, i) => (
                    <div key={i} className="stat-card" style={{ padding: 20 }}>
                        <div className="stat-content">
                            <h3 style={{ fontSize: '0.8rem' }}>{c.label}</h3>
                            <h2 style={{ fontSize: '1.4rem' }}>{c.value}</h2>
                        </div>
                        <div className="stat-icon" style={{ background: c.bg, color: c.color, width: 44, height: 44 }}>{c.icon}</div>
                    </div>
                ))}
            </div>

            <div style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', borderRadius: 'var(--radius-lg)', padding: '24px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#fff' }}>₹8,500</h2>
                    <p style={{ margin: '4px 0 0', fontSize: '0.8rem', opacity: 0.9 }}>Due by: 10 March 2025</p>
                </div>
                <button
                    onClick={handlePayNow}
                    style={{ background: '#fff', color: '#4F46E5', border: 'none', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                >
                    {paying ? 'Processing...' : 'Pay Now →'}
                </button>
            </div>

            <div className="table-container" style={{ marginTop: 0 }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Payment History</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory.map((p) => (
                            <tr key={p.id}>
                                <td style={{ fontWeight: 500 }}>{p.month}</td>
                                <td style={{ fontWeight: 600 }}>₹{p.amount}</td>
                                <td style={{ color: 'var(--text-muted)' }}>{p.date}</td>
                                <td><span className="badge success">{p.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PayFees;

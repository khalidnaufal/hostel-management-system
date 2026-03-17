import React, { useState } from 'react';

const messMenu = {
    Monday:    { breakfast: 'Idli, Sambar, Chutney', lunch: 'Rice, Dal, Sabzi, Roti, Salad', dinner: 'Roti, Paneer Butter Masala, Kheer' },
    Tuesday:   { breakfast: 'Poha, Tea, Fruit', lunch: 'Rice, Rajma, Roti, Curd', dinner: 'Roti, Dal Tadka, Jeera Rice' },
    Wednesday: { breakfast: 'Upma, Coconut Chutney, Tea', lunch: 'Rice, Chole, Roti, Salad', dinner: 'Roti, Mix Veg, Raita' },
    Thursday:  { breakfast: 'Puri, Aloo Sabzi, Tea', lunch: 'Rice, Dal Makhani, Roti, Pickle', dinner: 'Roti, Shahi Paneer, Rice' },
    Friday:    { breakfast: 'Dosa, Sambar, Chutney', lunch: 'Biryani, Raita, Salad', dinner: 'Roti, Dal Fry, Gulab Jamun' },
    Saturday:  { breakfast: 'Bread, Butter, Omelette, Tea', lunch: 'Rice, Kadhi, Roti, Salad', dinner: 'Noodles, Manchurian, Soup' },
    Sunday:    { breakfast: 'Chole Bhature, Tea', lunch: 'Special Thali (Rice, Dal, 2 Sabzi, Roti, Sweet)', dinner: 'Roti, Dal, Khichdi, Papad' },
};

const days = Object.keys(messMenu);
const today = days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

const mealColors = {
    breakfast: { bg: '#FEF3C7', color: '#92400E', label: '🌅 Breakfast' },
    lunch: { bg: '#D1FAE5', color: '#065F46', label: '☀️ Lunch' },
    dinner: { bg: '#EEF2FF', color: '#3730A3', label: '🌙 Dinner' },
};

const MessMenu = () => {
    const [selectedDay, setSelectedDay] = useState(today);

    return (
        <div className="page">
            <div className="page-header">
                <h2>🍽️ Weekly Mess Menu</h2>
                <span className="badge success" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>Today: {today}</span>
            </div>

            {/* Day Tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
                {days.map(day => (
                    <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: 'var(--radius-md)',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            transition: 'all 0.2s',
                            background: selectedDay === day ? 'var(--primary)' : 'var(--surface)',
                            color: selectedDay === day ? '#fff' : 'var(--text-muted)',
                            boxShadow: selectedDay === day ? '0 4px 12px rgba(79,70,229,0.3)' : 'var(--shadow-sm)',
                            border: selectedDay === day ? 'none' : '1px solid var(--border)',
                        }}
                    >
                        {day === today ? `${day} ★` : day}
                    </button>
                ))}
            </div>

            {/* Meal Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                {Object.entries(mealColors).map(([meal, style]) => (
                    <div key={meal} style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ background: style.bg, color: style.color, padding: '14px 20px', fontWeight: 700 }}>
                            {style.label}
                        </div>
                        <div style={{ padding: 20 }}>
                            <p style={{ margin: 0, lineHeight: 1.7, color: 'var(--text-main)' }}>
                                {messMenu[selectedDay][meal]}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Full Week Table */}
            <div className="table-container" style={{ marginTop: 28 }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Full Weekly Schedule</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>🌅 Breakfast</th>
                            <th>☀️ Lunch</th>
                            <th>🌙 Dinner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {days.map(day => (
                            <tr key={day} style={{ background: day === today ? '#F5F3FF' : undefined }}>
                                <td style={{ fontWeight: 700, color: day === today ? 'var(--primary)' : 'inherit' }}>
                                    {day} {day === today && <span className="badge info" style={{ fontSize: '0.65rem', marginLeft: 6 }}>Today</span>}
                                </td>
                                <td style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{messMenu[day].breakfast}</td>
                                <td style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{messMenu[day].lunch}</td>
                                <td style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{messMenu[day].dinner}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MessMenu;

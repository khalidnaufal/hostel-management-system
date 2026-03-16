import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus } from 'lucide-react';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const { data } = await api.get('/rooms');
            setRooms(data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    return (
        <div className="page">
            <div className="page-header">
                <h2>Room Management</h2>
                <button className="btn">
                    <Plus size={18} /> Add Room
                </button>
            </div>
            
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Room Number</th>
                            <th>Capacity</th>
                            <th>Occupancy</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.length === 0 ? (
                            <tr><td colSpan="4" style={{ textAlign: 'center', padding: '32px' }}>No rooms found</td></tr>
                        ) : (
                            rooms.map(room => (
                                <tr key={room._id}>
                                    <td style={{ fontWeight: 500 }}>{room.roomNumber}</td>
                                    <td>{room.capacity}</td>
                                    <td>{room.occupancy}</td>
                                    <td>
                                        <span className={`badge ${room.occupancy >= room.capacity ? 'danger' : 'success'}`}>
                                            {room.occupancy >= room.capacity ? 'Full' : 'Available'}
                                        </span>
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

export default Rooms;

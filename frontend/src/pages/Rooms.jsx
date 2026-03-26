import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Trash2 } from 'lucide-react';
import RoomModal from '../components/RoomModal';
import Skeleton from '../components/Skeleton';
import { useAuth } from '../context/AuthContext';

const Rooms = () => {
    const { searchQuery } = useAuth();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/rooms');
            setRooms(data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddRoom = async (roomData) => {
        try {
            await api.post('/rooms', roomData);
            fetchRooms();
            setIsModalOpen(false);
        } catch (error) {
            alert('Error adding room: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            try {
                await api.delete(`/rooms/${id}`);
                fetchRooms();
            } catch (error) {
                alert('Error deleting room: ' + (error.response?.data?.message || error.message));
            }
        }
    };

    return (
        <div className="page">
            <div className="page-header">
                <h2>Room Management</h2>
                <button className="btn" onClick={() => setIsModalOpen(true)}>
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array(5).fill(0).map((_, i) => (
                                <tr key={i}>
                                    <td><Skeleton width="100px" height="18px" /></td>
                                    <td><Skeleton width="40px" height="18px" /></td>
                                    <td><Skeleton width="40px" height="18px" /></td>
                                    <td><Skeleton width="80px" height="24px" borderRadius="12px" /></td>
                                    <td><Skeleton width="32px" height="32px" borderRadius="8px" /></td>
                                </tr>
                            ))
                        ) : rooms.filter(r => !searchQuery || r.room_number?.toString().includes(searchQuery)).length === 0 ? (
                            <tr><td colSpan="5" style={{ textAlign: 'center', padding: '32px' }}>No matching rooms found</td></tr>
                        ) : (
                            rooms
                                .filter(r => !searchQuery || r.room_number?.toString().includes(searchQuery))
                                .map(room => (
                                <tr key={room.id}>
                                    <td style={{ fontWeight: 500 }}>{room.room_number}</td>
                                    <td>{room.capacity}</td>
                                    <td>{room.occupancy}</td>
                                    <td>
                                        <span className={`badge ${room.occupancy >= room.capacity ? 'danger' : 'success'}`}>
                                            {room.occupancy >= room.capacity ? 'Full' : 'Available'}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="icon-btn"
                                            style={{ color: '#EF4444', width: '32px', height: '32px' }}
                                            onClick={() => handleDelete(room.id)}
                                            title="Delete Room"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <RoomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddRoom}
            />
        </div>
    );
};

export default Rooms;

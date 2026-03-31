import React from 'react';
import { createPortal } from 'react-dom';
import { LogOut, X } from 'lucide-react';
import './LogoutModal.css';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="logout-overlay" onClick={onClose}>
            <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
                <div className="logout-icon-container">
                    <LogOut size={32} />
                </div>
                
                <h3 className="animate-in">Wait! Leaving already?</h3>
                <p className="animate-in">Are you sure you want to log out? Your session will be ended.</p>
                
                <div className="logout-actions">
                    <button 
                        className="btn-cancel" 
                        onClick={onClose}
                    >
                        Keep me Logged In
                    </button>
                    <button 
                        className="btn-confirm" 
                        onClick={onConfirm}
                    >
                        Confirm Logout
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default LogoutModal;

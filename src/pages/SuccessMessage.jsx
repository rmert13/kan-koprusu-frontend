import React from 'react';
import '../styles/successMessage.css'; 

const SuccessMessage = ({ message, onClose }) => {
    return (
        <div className="success-message-overlay">
            <div className="success-message-container">
                <div className="success-message-icon">&#10003;</div>
                <div className="success-message-text">{message}</div>
                <button className="success-message-button" onClick={onClose}>Tamam</button>
            </div>
        </div>
    );
};

export default SuccessMessage;

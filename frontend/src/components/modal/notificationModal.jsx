import React from 'react';
import './notificationModal.css';

const NotificationModal = ({ show, onClose, message }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Pranešimai</h3>
        <p>{message}</p>
        <button onClick={onClose}>Uždaryti</button>
      </div>
    </div>
  );
};

export default NotificationModal;

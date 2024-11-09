import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../../auth';
import NotificationModal from '../modal/notificationModal';
import './navbar.css';

const Navbar = () => {
  const roleId = parseInt(localStorage.getItem('role_id'), 10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
  };

  const handleShowNotification = () => {
    setIsModalOpen(true);
  };

  const handleCloseNotification = () => {
    setIsModalOpen(false);
  };

  return (
    <nav>
      <ul className="nav-list">
        <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>

        {roleId === 1 && (
          <>
            <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li>
            <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
          </>
        )}

        {roleId === 2 && (
          <>
            <li className="nav-item"><Link to="/book-borrow" className="nav-link">Lend Book</Link></li>
            <button onClick={handleShowNotification} className="nav-link-button">Notifications</button>
          </>
        )}

        {roleId === 3 && (
          <>
            <li className="nav-item"><Link to="/book-management" className="nav-link">Book Management</Link></li>
          </>
        )}

        {roleId === 4 && (
          <>
            <li className="nav-item"><Link to="/librarian-management" className="nav-link">Add Librarian</Link></li>
          </>
        )}

        {roleId !== 1 && (
          <li className="nav-item">
            <button onClick={handleSignOut}>Sign Out</button>
          </li>
        )}
      </ul>

      {/* Notification Modal */}
      <NotificationModal
        show={isModalOpen}
        onClose={handleCloseNotification}
        message="This is your notification message!"
      />
    </nav>
  );
};

export default Navbar;

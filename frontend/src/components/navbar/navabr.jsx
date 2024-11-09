// Navbar.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../../auth';
import NotificationModal from '../modal/notificationModal';
import ButtonSignout from './buttonSignout';
import ButtonNotification from './buttonNotification';
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
        <li className="nav-item"><Link to="/" className="nav-link">Pagrindinis</Link></li>

        {roleId === 1 && (
          <>
            <li className="nav-item"><Link to="/register" className="nav-link">Registruotis</Link></li>
            <li className="nav-item"><Link to="/login" className="nav-link">Prisijungti</Link></li>
          </>
        )}

        {roleId === 2 && (
          <>
            <li className="nav-item"><Link to="/book-borrow" className="nav-link">Knygos</Link></li>
            <ButtonNotification onClick={handleShowNotification} label="Pranešimai" />
          </>
        )}

        {roleId === 3 && (
          <>
            <li className="nav-item"><Link to="/book-management" className="nav-link">Knygų redagavimas</Link></li>
          </>
        )}

        {roleId === 4 && (
          <>
            <li className="nav-item"><Link to="/librarian-management" className="nav-link">Pridėti bibliotekiniką</Link></li>
          </>
        )}

        {roleId !== 1 && (
          <li className="nav-item">
            <ButtonSignout onClick={handleSignOut} label="Atsijungti" />
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

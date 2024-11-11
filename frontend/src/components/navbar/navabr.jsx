import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../../auth';
import NotificationModal from '../modal/notificationModal';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

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
    <AppBar position="static" sx={{ bgcolor: '#2f2c32' }}>
      <Toolbar>
        <IconButton color="inherit" component={Link} to="/" sx={{ mr: 2 }}>
          <MenuBookIcon />
        </IconButton>
        <Typography variant="h6" component={Link} to="/" color="inherit" sx={{ textDecoration: 'none', flexGrow: 1 }}>
          Biblioteka
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {roleId === 1 && (
            <>
              <Button color="inherit" component={Link} to="/register">
                Registruotis
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Prisijungti
              </Button>
            </>
          )}

          {roleId === 2 && (
            <>
              <Button color="inherit" component={Link} to="/book-borrow">
                Knygos
              </Button>
              <IconButton color="inherit" onClick={handleShowNotification}>
                <NotificationsIcon />
              </IconButton>
            </>
          )}

          {roleId === 3 && (
            <>
              <Button color="inherit" component={Link} to="/book-management">
                Knygų redagavimas
              </Button>
              <Button color="inherit" component={Link} to="/book-borrow-page">
                Paskolintos knygos
              </Button>
            </>
          )}

          {roleId === 4 && (
            <Button color="inherit" component={Link} to="/librarian-management">
              Pridėti bibliotekiniką
            </Button>
          )}

          {roleId !== 1 && (
            <IconButton color="inherit" onClick={handleSignOut}>
              <ExitToAppIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      <NotificationModal
        show={isModalOpen}
        onClose={handleCloseNotification}
        message="Gražinimo terminas baigiasi po 3 dienų"
      />
    </AppBar>
  );
};

export default Navbar;

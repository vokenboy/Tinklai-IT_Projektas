import React, { useEffect, useState } from 'react';
import { getUserById } from '../api/usersApi';
import { Box, Typography, Paper, Alert, Button } from '@mui/material';

const Profile = () => {
  const id = localStorage.getItem('user_id');
  const role_id = localStorage.getItem('role_id');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (role_id === '1') {
        setUser({
          name: 'Svečias',
          surname: '',
          email: 'N/A',
          role: 'Svečias',
        });
        return;
      }

      try {
        const userData = await getUserById(id);
        setUser(userData);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Nepavyko įkelti profilio informacijos.');
      }
    };

    fetchUserProfile();
  }, [id]);

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Įkeliama...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ maxWidth: 600, p: 3, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom>
          {user.role === 'guest'
            ? 'Svečio profilis'
            : user.role === 'librarian'
            ? 'Bibliotekininko profilis'
            : user.role === 'admin'
            ? 'Administratoriaus profilis'
            : 'Naudotojo profilis'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Vardas:</strong> {user.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Pavardė:</strong> {user.surname || 'N/A'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>El. paštas:</strong> {user.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Rolė:</strong> {user.role}
        </Typography>
        {user.role === 'user' && (
          <Typography variant="body1" gutterBottom>
            <strong>Aktyvūs skolinimai:</strong> {user.activeLoans || 0}
          </Typography>
        )}
        {user.role === 'librarian' && (
          <Button variant="contained" color="primary" href="/librarian-management">
            Tvarkyti biblioteką
          </Button>
        )}
        {user.role === 'admin' && (
          <Button variant="contained" color="secondary" href="/admin-management">
            Administratoriaus valdymas
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default Profile;

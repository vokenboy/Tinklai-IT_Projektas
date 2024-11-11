import React, { useState } from 'react';
import { loginUser } from '../../api/authApi';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material';

const UserLoginForm = () => {
  const [formData, setFormData] = useState({
    epastas: '',
    slaptazodis: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role_id', data.role_id);
      localStorage.setItem('user_id', data.user_id);
      window.location.href = '/';
    } catch (error) {
      setMessage(error.response?.data?.error || 'Prisijungimas nepavyko');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 1,
          boxShadow: 3,
          bgcolor: 'background.paper'
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Prisijungti
        </Typography>
        {message && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="El. Paštas"
            variant="outlined"
            name="epastas"
            value={formData.epastas}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Slaptažodis"
            variant="outlined"
            type="password"
            name="slaptazodis"
            value={formData.slaptazodis}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Prisijungti
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UserLoginForm;

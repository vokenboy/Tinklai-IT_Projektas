import React, { useState } from 'react';
import { registerUser } from '../../api/authApi';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material';

const UserRegisterForm = () => {
  const [formData, setFormData] = useState({
    epastas: '',
    slaptazodis: '',
    vardas: '',
    pavarde: ''
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
      const data = await registerUser({ ...formData, role_id: 2 });
      setMessage(data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Registracija nepavyko');
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
          Registracija
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
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Vardas"
            variant="outlined"
            name="vardas"
            value={formData.vardas}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Pavardė"
            variant="outlined"
            name="pavarde"
            value={formData.pavarde}
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
            Registruotis
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UserRegisterForm;

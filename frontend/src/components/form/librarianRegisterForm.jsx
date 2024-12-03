import React, { useState } from 'react';
import { registerUser } from '../../api/authApi';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';

const LibrarianRegisterForm = () => {
  const [formData, setFormData] = useState({
    epastas: '',
    slaptazodis: '',
    vardas: '',
    pavarde: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser({ ...formData, role_id: 3 });
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
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Pridėti Knygininką
        </Typography>
        {message && (
          <Alert severity={message.includes('sekmingai') ? 'success' : 'error'} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="El. Paštas"
            name="epastas"
            variant="outlined"
            value={formData.epastas}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Slaptažodis"
            name="slaptazodis"
            type="password"
            variant="outlined"
            value={formData.slaptazodis}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Vardas"
            name="vardas"
            variant="outlined"
            value={formData.vardas}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Pavardė"
            name="pavarde"
            variant="outlined"
            value={formData.pavarde}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Pridėti Knygininką
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LibrarianRegisterForm;

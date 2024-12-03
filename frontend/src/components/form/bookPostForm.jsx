import React, { useState } from 'react';
import { addBook } from '../../api/booksApi';
import {
  Container,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';

const BookPostForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genreId, setGenreId] = useState('');
  const [copies, setCopies] = useState('');
  const [isbn, setIsbn] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const genreOptions = [
    { id: 1, name: 'Drama' },
    { id: 2, name: 'Istorine grozine literatura' },
    { id: 3, name: 'Moksline fantastika' },
    { id: 4, name: 'Detektyvas' },
    { id: 5, name: 'Trileris' },
    { id: 6, name: 'Romanas' },
    { id: 7, name: 'Moksline literatura' },
    { id: 8, name: 'Pasakos' },
    { id: 9, name: 'Vaiku literatūra' },
    { id: 10, name: 'Religine literatura' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!/^\d{13}$/.test(isbn)) {
      setError('ISBN turi būti 13 skaitmenų');
      return;
    }
    
    const newBook = {
      pavadinimas: title,
      autorius: author,
      zanras_id: Number(genreId),
      kopiju_kiekis: Number(copies),
      isbn: Number(isbn),
    };

    try {
      const response = await addBook(newBook);
      setMessage(response.message);
      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.error || 'Nepavyko pridėti knygos');
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
        <Typography variant="h5" component="h1" gutterBottom>
          Pridėti Knygą
        </Typography>
        {message && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Pavadinimas"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Autorius"
            variant="outlined"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel id="genre-label">Žanras</InputLabel>
            <Select
              labelId="genre-label"
              value={genreId}
              onChange={(e) => setGenreId(e.target.value)}
              label="Žanras"
              required
            >
              <MenuItem value="" disabled>
                Pasirinkti žanrą
              </MenuItem>
              {genreOptions.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Kopijų kiekis"
            variant="outlined"
            type="number"
            value={copies}
            onChange={(e) => setCopies(e.target.value)}
            required
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="ISBN numeris"
            variant="outlined"
            type="number"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
            sx={{ mb: 3 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Pridėti knygą
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default BookPostForm;

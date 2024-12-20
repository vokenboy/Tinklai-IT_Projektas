import React, { useState } from 'react';
import { editBook } from '../../api/booksApi';
import {
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

const BookEditModal = ({ book, onClose, onBookUpdated }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [genre, setGenre] = useState(book.genre);
  const [copies, setCopies] = useState(book.copies);
  const [isbn, setIsbn] = useState(book.isbn);
  const [releaseDate, setReleaseDate] = useState(book.data); // Added state for release date

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

  const handleSave = async () => {
    if (!/^\d{13}$/.test(isbn)) {
      alert('ISBN numeris turi būti lygiai 13 skaitmenų.');
      return;
    }

    if (!releaseDate) {
      alert('Išleidimo data yra privaloma.');
      return;
    }

    try {
      const updatedBook = {
        id: book.id,
        pavadinimas: title,
        autorius: author,
        zanras_id: genreOptions.find((option) => option.name === genre)?.id,
        kopiju_kiekis: copies,
        isbn: isbn,
        data: releaseDate, // Include release date in the updated book object
      };
      await editBook(updatedBook);
      console.log('Knyga atnaujinta sėkmingai:', updatedBook);
      onBookUpdated();
      onClose();
    } catch (error) {
      console.error('Klaida atnaujinant knygą:', error);
    }
  };

  return (
    <Modal
      open={Boolean(book)}
      onClose={onClose}
      aria-labelledby="edit-book-modal"
      aria-describedby="modal-to-edit-book-details"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography id="edit-book-modal" variant="h6" component="h2" gutterBottom>
          Redaguoti knygą
        </Typography>
        <TextField
          fullWidth
          label="Pavadinimas"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Autorius"
          variant="outlined"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel id="genre-label">Žanras</InputLabel>
          <Select
            labelId="genre-label"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            label="Žanras"
          >
            <MenuItem value="" disabled>
              Pasirinkite žanrą
            </MenuItem>
            {genreOptions.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
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
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          label="ISBN numeris"
          variant="outlined"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Išleidimo data"
          variant="outlined"
          type="date" // Use date input type for release date
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          sx={{ mb: 3 }}
          InputLabelProps={{
            shrink: true, // Ensures the label remains above the input
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Išsaugoti
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Atšaukti
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BookEditModal;

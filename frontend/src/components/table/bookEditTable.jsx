import React, { useState, useEffect } from 'react';
import { getBooks, deleteBook } from '../../api/booksApi';
import BookEditModal from '../modal/bookEditModal';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Box,
  Alert,
  Button,
  TableSortLabel,
} from '@mui/material';

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'asc' });

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Extracts YYYY-MM-DD
  };

  const fetchBooks = async () => {
    try {
      const booksData = await getBooks();
      const formattedData = booksData.map((book) => ({
        id: book.id,
        title: book.pavadinimas,
        author: book.autorius,
        genre: book.zanras,
        copies: book.kopiju_kiekis,
        isbn: book.isbn,
        data: formatDate(book.data), // Format release date
      }));
      setBooks(formattedData);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to load books');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSort = (key) => {
    const isAsc = sortConfig.key === key && sortConfig.direction === 'asc';
    setSortConfig({ key, direction: isAsc ? 'desc' : 'asc' });

    const sortedBooks = [...books].sort((a, b) => {
      if (a[key] < b[key]) return isAsc ? -1 : 1;
      if (a[key] > b[key]) return isAsc ? 1 : -1;
      return 0;
    });

    setBooks(sortedBooks);
  };

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleBookUpdated = () => {
    fetchBooks();
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteBook(id);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const headers = [
    { key: 'title', label: 'Pavadinimas' },
    { key: 'author', label: 'Autorius' },
    { key: 'genre', label: 'Žanras' },
    { key: 'copies', label: 'Kopijų kiekis' },
    { key: 'isbn', label: 'ISBN numeris' },
    { key: 'data', label: 'Išleidimo data' },
    { key: 'functions', label: 'Funkcijos', sortable: false },
  ];

  return (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ maxWidth: 1500, width: '100%' }}>
        <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
          Knygų Lentelė
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell key={header.key} sx={{ fontWeight: 'bold' }}>
                    {header.sortable !== false ? (
                      <TableSortLabel
                        active={sortConfig.key === header.key}
                        direction={sortConfig.key === header.key ? sortConfig.direction : 'asc'}
                        onClick={() => handleSort(header.key)}
                      >
                        {header.label}
                      </TableSortLabel>
                    ) : (
                      header.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.copies}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{book.data}</TableCell> {/* Formatted release date */}
                  <TableCell
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: '#1976d2', color: '#ffffff' }}
                        onClick={() => handleEditClick(book)}
                      >
                        Redaguoti
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: '#d32f2f', color: '#ffffff' }}
                        onClick={() => handleDeleteClick(book.id)}
                      >
                        Šalinti
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {isModalOpen && (
          <BookEditModal
            book={selectedBook}
            onClose={handleCloseModal}
            onBookUpdated={handleBookUpdated}
          />
        )}
      </Box>
    </Box>
  );
};

export default BookTable;

import React, { useState, useEffect } from 'react';
import { getBooks } from '../../api/booksApi';
import { borrowBook } from '../../api/booksBorrowApi';
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Checkbox,
  Button,
  Typography,
  Alert,
  TableSortLabel,
} from '@mui/material';

const BookBorrowForm = () => {
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [message, setMessage] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'pavadinimas', direction: 'asc' });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleBookSelect = (bookId) => {
    setSelectedBooks((prevSelected) =>
      prevSelected.includes(bookId)
        ? prevSelected.filter((id) => id !== bookId)
        : [...prevSelected, bookId]
    );
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const naudotojas_id = localStorage.getItem('user_id');
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const data_nuo = today.toISOString().split('T')[0];
    const data_iki = nextWeek.toISOString().split('T')[0];

    if (selectedBooks.length === 0) {
      alert('Pasirinkite bent vieną knygą.');
      return;
    }

    const borrowRequests = selectedBooks.map((knyga_id) => ({
      knyga_id,
      naudotojas_id,
      data_nuo,
      data_iki,
    }));

    try {
      await borrowBook(borrowRequests);
      setMessage('Knygos sėkmingai pasiskolintos.');
      setSelectedBooks([]);
    } catch (error) {
      if (error.response?.status === 403) {
        setMessage('Turite vėluojančių knygų. Grąžinkite jas prieš skolindamiesi naujas knygas.');
      } else {
        setMessage('Nepavyko pasiskolinti knygų.');
      }
    }
  };

  const headers = [
    { key: 'pavadinimas', label: 'Pavadinimas' },
    { key: 'autorius', label: 'Autorius' },
    { key: 'kopiju_kiekis', label: 'Kopijų kiekis' },
  ];

  return (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ maxWidth: 600, width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Pasirinkti Knygas
        </Typography>
        {message && (
          <Alert severity={message.includes('sekmingai') ? 'success' : 'error'} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pasirinkti</TableCell>
                {headers.map((header) => (
                  <TableCell key={header.key}>
                    <TableSortLabel
                      active={sortConfig.key === header.key}
                      direction={sortConfig.key === header.key ? sortConfig.direction : 'asc'}
                      onClick={() => handleSort(header.key)}
                    >
                      {header.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedBooks.includes(book.id)}
                      onChange={() => handleBookSelect(book.id)}
                    />
                  </TableCell>
                  <TableCell>{book.pavadinimas}</TableCell>
                  <TableCell>{book.autorius}</TableCell>
                  <TableCell>{book.kopiju_kiekis}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          onClick={handleSubmit}
          color="primary"
          fullWidth
        >
          Pasirinkti knygas
        </Button>
      </Box>
    </Box>
  );
};

export default BookBorrowForm;

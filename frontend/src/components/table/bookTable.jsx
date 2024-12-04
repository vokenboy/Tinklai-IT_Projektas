import React, { useState, useEffect } from 'react';
import { getBooks } from '../../api/booksApi';
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
} from '@mui/material';

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Extracts YYYY-MM-DD
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBooks();
        const formattedData = booksData.map((book) => ({
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

    fetchBooks();
  }, []);

  const headers = ['Pavadinimas', 'Autorius', 'Žanras', 'Kopijų kiekis', 'ISBN numeris', 'Išleidimo data'];

  return (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ maxWidth: 1200, width: '100%' }}>
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
                {headers.map((header, index) => (
                  <TableCell key={index} sx={{ fontWeight: 'bold' }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book, index) => (
                <TableRow key={index}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.copies}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{book.data}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default BookTable;

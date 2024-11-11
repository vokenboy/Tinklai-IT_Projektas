import React, { useState, useEffect } from 'react';
import { getBooksBorrowed, deleteBorrowedBook } from '../../api/booksBorrowApi';
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
  Button,
  Alert,
} from '@mui/material';

const BooksBorrowedTable = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const data = await getBooksBorrowed();
        const formattedData = data.map((book) => ({
          ...book,
          data_nuo: new Date(book.data_nuo).toLocaleDateString('lt-LT'),
          data_iki: new Date(book.data_iki).toLocaleDateString('lt-LT'),
        }));
        setBorrowedBooks(formattedData);
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
        setError('Failed to load borrowed books');
      }
    };

    fetchBorrowedBooks();
  }, []);

  const handleDeleteClick = async (id) => {
    try {
      await deleteBorrowedBook(id);
      setBorrowedBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error('Error deleting borrowed book:', error);
    }
  };

  const headers = ['Pavadinimas', 'Vardas', 'Pavardė', 'Data Nuo', 'Data Iki', 'Funkcijos'];

  return (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ maxWidth: 1000, width: '100%' }}>
        <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
          Paskolintos Knygos
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
              {borrowedBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.pavadinimas}</TableCell>
                  <TableCell>{book.vardas}</TableCell>
                  <TableCell>{book.pavarde}</TableCell>
                  <TableCell>{book.data_nuo}</TableCell>
                  <TableCell>{book.data_iki}</TableCell>
                  <TableCell
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteClick(book.id)}
                    >
                      Grąžino knygą
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default BooksBorrowedTable;

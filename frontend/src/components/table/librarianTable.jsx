import React, { useState, useEffect } from 'react';
import { getLibrarians } from '../../api/usersApi';
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Alert,
} from '@mui/material';

const LibrarianTable = () => {
  const [librarians, setLibrarians] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLibrarians = async () => {
      try {
        const librariansData = await getLibrarians();
        setLibrarians(librariansData);
      } catch (err) {
        console.error('Error fetching librarians:', err);
        setError('Nepavyko užkrauti bibliotekinikų sąrašo.');
      }
    };

    fetchLibrarians();
  }, []);

  return (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ maxWidth: 800, width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Knygininkų sąrašas
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {librarians.length > 0 ? (
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vardas</TableCell>
                  <TableCell>Pavardė</TableCell>
                  <TableCell>El. Paštas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {librarians.map((librarian) => (
                  <TableRow key={librarian.id}>
                    <TableCell>{librarian.vardas}</TableCell>
                    <TableCell>{librarian.pavarde}</TableCell>
                    <TableCell>{librarian.epastas}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1">Nerasta bibliotekinikų</Typography>
        )}
      </Box>
    </Box>
  );
};

export default LibrarianTable;

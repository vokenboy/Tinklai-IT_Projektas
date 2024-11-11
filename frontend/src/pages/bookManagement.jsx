import React, { useState, useEffect } from 'react';
import { getBooks } from '../api/booksApi';
import BookPostForm from '../components/form/bookPostForm';
import BookEditTable from '../components/table/bookEditTable';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      const booksData = await getBooks();
      setBooks(booksData);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to load books');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <BookPostForm onBookAdded={fetchBooks} />
      <BookEditTable books={books} fetchBooks={fetchBooks} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default BookManagement;

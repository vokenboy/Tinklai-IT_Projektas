import React, { useState, useEffect } from 'react';
import Table from '../components/table/table';
import BookPostForm from '../components/form/bookPostForm';
import { getBooks } from '../api/booksApi';

const BookManagement = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const booksData = await getBooks();
      setBooks(booksData);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Book Management</h1>
      <BookPostForm onBookAdded={fetchBooks} />
      <Table headers={['title', 'author', 'genre', 'copies']} data={books} />
    </div>
  );
};

export default BookManagement;

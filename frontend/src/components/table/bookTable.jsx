// components/table/bookTable.jsx
import React, { useState, useEffect } from 'react';
import { getBooks } from '../../api/booksApi';

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBooks();
        const formattedData = booksData.map((book) => ({
          title: book.pavadinimas,
          author: book.autorius,
          genre: book.zanras,
          copies: book.kopiju_kiekis,
        }));
        
        setBooks(formattedData);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to load books');
      }
    };

    fetchBooks();
  }, []);

  const headers = ['Title', 'Author', 'Genre', 'Copies'];

  return (
    <div>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.copies}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;

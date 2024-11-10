import React, { useState, useEffect } from 'react';
import { getBooks, deleteBook } from '../../api/booksApi';
import BookEditModal from '../modal/bookEditModal';
import EditButton from '../button/editButton';
import DeleteButton from '../button/deleteButton';
import './table.css';

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const booksData = await getBooks();
      const formattedData = booksData.map((book) => ({
        id: book.id,
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

  useEffect(() => {
    fetchBooks();
  }, []);

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
      fetchBooks(); // Refresh the book list after deletion
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const headers = ['Pavadinimas', 'Autorius', 'Žanras', 'Kopijų kiekis', 'Funkcijos'];

  return (
    <div className="book-table-container">
      {error && <p>{error}</p>}
      <table className="book-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.copies}</td>
              <td>
                <div className="button-container">
                  <EditButton onClick={() => handleEditClick(book)} />
                  <DeleteButton onClick={() => handleDeleteClick(book.id) } />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <BookEditModal
          book={selectedBook}
          onClose={handleCloseModal}
          onBookUpdated={handleBookUpdated}
        />
      )}
    </div>
  );
};

export default BookTable;

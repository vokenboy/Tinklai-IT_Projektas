import React, { useState, useEffect } from 'react';
import { getBooksBorrowed, deleteBorrowedBook } from '../../api/booksBorrowApi';

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
      setBorrowedBooks((prevBooks) => prevBooks.filter(book => book.id !== id));
    } catch (error) {
      console.error('Error deleting borrowed book:', error);
    }
  };

  const headers = ['Pavadinimas', 'Vardas', 'Pavardė', 'Data Nuo', 'Data Iki', 'Funkcijos'];

  return (
    <div className="books-borrowed-table-container">
      {error && <p className="error-message">{error}</p>}
      <table className="books-borrowed-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {borrowedBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.pavadinimas}</td>
              <td>{book.vardas}</td>
              <td>{book.pavarde}</td>
              <td>{book.data_nuo}</td>
              <td>{book.data_iki}</td>
              <td>
                <button onClick={() => handleDeleteClick(book.id)}>Grąžino knygą</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksBorrowedTable;

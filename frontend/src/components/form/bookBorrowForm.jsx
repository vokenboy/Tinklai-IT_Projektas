import React, { useState, useEffect } from 'react';
import { getBooks } from '../../api/booksApi';
import { borrowBook } from '../../api/booksBorrowApi';

const BookBorrowForm = () => {
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [message, setMessage] = useState('');

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
    setSelectedBooks(prevSelected =>
      prevSelected.includes(bookId)
        ? prevSelected.filter(id => id !== bookId)
        : [...prevSelected, bookId]
    );
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
      alert('Please select at least one book to borrow.');
      return;
    }

    const borrowRequests = selectedBooks.map(knyga_id => ({
      knyga_id,
      naudotojas_id,
      data_nuo,
      data_iki
    }));

    try {
      await borrowBook(borrowRequests);
      setMessage('Books borrowed successfully!');
      setSelectedBooks([]);
    } catch (error) {
      setMessage('Borrowing failed');
    }
  };

  return (
    <div>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Title</th>
              <th>Author</th>
              <th>Copies Available</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedBooks.includes(book.id)}
                    onChange={() => handleBookSelect(book.id)}
                  />
                </td>
                <td>{book.pavadinimas}</td>
                <td>{book.autorius}</td>
                <td>{book.kopiju_kiekis}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit">Borrow Selected Books</button>
      </form>
    </div>
  );
};

export default BookBorrowForm;

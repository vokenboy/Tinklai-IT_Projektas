import React, { useState } from 'react';
import { addBook } from '../../api/booksApi';

const AddBookForm = ({ onBookAdded }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genreId, setGenreId] = useState('');
  const [copies, setCopies] = useState('');

  const genreOptions = [
    { id: 1, name: 'Drama' },
    { id: 2, name: 'Fantasy' },
    { id: 3, name: 'Science Fiction' },
    { id: 4, name: 'Mystery' },
    { id: 5, name: 'Horror' },
    { id: 6, name: 'Romance' },
    { id: 7, name: 'Non-Fiction' },
    { id: 8, name: 'Historical Fiction' },
    { id: 9, name: 'Fairy Tales' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newBook = {
      pavadinimas: title,
      autorius: author,
      zanras_id: Number(genreId),
      kopiju_kiekis: Number(copies),
    };
  
    try {
      await addBook(newBook);
      alert('Book added successfully');
      onBookAdded();
      setTitle('');
      setAuthor('');
      setGenreId('');
      setCopies('');
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to add book');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Genre:</label>
        <select
          value={genreId}
          onChange={(e) => setGenreId(e.target.value)}
          required
        >
          <option value="" disabled>Select a genre</option>
          {genreOptions.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Copies:</label>
        <input
          type="number"
          value={copies}
          onChange={(e) => setCopies(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;

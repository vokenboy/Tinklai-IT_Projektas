import React, { useState } from 'react';
import { addBook } from '../../api/booksApi';
import './form.css';

const BookPostForm = ({ onBookAdded }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genreId, setGenreId] = useState('');
  const [copies, setCopies] = useState('');

  const genreOptions = [
    { id: 1, name: 'Drama' },
    { id: 2, name: 'Istorine grozine literatura' },
    { id: 3, name: 'Moksline fantastika' },
    { id: 4, name: 'Detektyvas' },
    { id: 5, name: 'Trileris' },
    { id: 6, name: 'Romanas' },
    { id: 7, name: 'Moksline literatura' },
    { id: 8, name: 'Pasakos' },
    { id: 9, name: 'Vaiku literatūra' },
    { id: 10, name: 'Religine literatura' },
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
      alert('Knyga pridėta sėkmingai');
      onBookAdded();
      setTitle('');
      setAuthor('');
      setGenreId('');
      setCopies('');
    } catch (error) {
      alert(error.response?.data?.error || 'Nepavyko pridėti knygos');
    }
  };

  return (
    <form className="book-post-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={title}
          placeholder="Pavadinimas"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          value={author}
          placeholder="Autorius"
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <select
          value={genreId}
          placeholder="Žanras"
          onChange={(e) => setGenreId(e.target.value)}
          required
        >
          <option value="" disabled>Pasirinkti žanrą</option>
          {genreOptions.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <input
          type="number"
          value={copies}
          placeholder="Kopijų kiekis"
          onChange={(e) => setCopies(e.target.value)}
          required
        />
      </div>
      <button className="button" type="submit">Pridėti knygą</button>
    </form>
  );
};

export default BookPostForm;

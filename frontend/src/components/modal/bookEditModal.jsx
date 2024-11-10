import React, { useState } from 'react';
import { editBook } from '../../api/booksApi';

const BookEditModal = ({ book, onClose, onBookUpdated }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [genre, setGenre] = useState(book.genre);
  const [copies, setCopies] = useState(book.copies);

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

  const handleSave = async () => {
    try {
      const updatedBook = {
        id: book.id,
        pavadinimas: title,
        autorius: author,
        zanras_id: genreOptions.find(option => option.name === genre)?.id,
        kopiju_kiekis: copies,
      };
      await editBook(updatedBook);
      console.log('Book updated successfully:', updatedBook);
      onBookUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Redaguoti knygą</h2>
        <div className="form-group">
          <label>Pavadinimas:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Autorius:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Žanras:</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="" disabled>Pasirinkite žanrą</option>
            {genreOptions.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Kopijų kiekis:</label>
          <input
            type="number"
            value={copies}
            onChange={(e) => setCopies(e.target.value)}
          />
        </div>
        <div className="modal-buttons">
          <button onClick={handleSave}>Išsaugoti</button>
          <button onClick={onClose}>Atšaukti</button>
        </div>
      </div>
    </div>
  );
};

export default BookEditModal;

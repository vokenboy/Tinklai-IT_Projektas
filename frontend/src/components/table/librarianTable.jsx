import React, { useState, useEffect } from 'react';
import { getLibrarians } from '../../api/usersApi';
import './table.css';

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
    <div className="librarian-table-container">
      <h3>Knygininkų sąrašas</h3>
      {error && <p>{error}</p>}
      {librarians.length > 0 ? (
        <table className="librarian-table">
          <thead>
            <tr>
              <th>Vardas</th>
              <th>Pavardė</th>
              <th>El. Paštas</th>
            </tr>
          </thead>
          <tbody>
            {librarians.map((librarian) => (
              <tr key={librarian.id}>
                <td>{librarian.vardas}</td>
                <td>{librarian.pavarde}</td>
                <td>{librarian.epastas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nerasta bibliotekinikų</p>
      )}
    </div>
  );
};

export default LibrarianTable;

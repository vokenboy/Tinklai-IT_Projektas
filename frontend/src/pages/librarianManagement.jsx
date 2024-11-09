import React, { useState, useEffect } from 'react';
import LibrarianRegisterForm from '../components/form/librarianRegisterForm';
import { getLibrarians } from '../api/usersApi';

const LibrarianManagement = () => {
  const [librarians, setLibrarians] = useState([]);

  const fetchLibrarians = async () => {
    try {
      const librariansData = await getLibrarians();
      setLibrarians(librariansData);
    } catch (error) {
      console.error('Error fetching librarians:', error);
    }
  };

  useEffect(() => {
    fetchLibrarians();
  }, []);

  return (
    <div>

      <LibrarianRegisterForm onLibrarianAdded={fetchLibrarians} />

      <h3>Current Librarians</h3>
      {librarians.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {librarians.map((librarian) => (
              <tr key={librarian.id}>
                <td>{librarian.id}</td>
                <td>{librarian.vardas}</td>
                <td>{librarian.pavarde}</td>
                <td>{librarian.role_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No librarians found.</p>
      )}
    </div>
  );
};

export default LibrarianManagement;

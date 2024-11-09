import React, { useState } from 'react';
import { registerUser } from '../../api/authApi';

const AddLibrarianForm = () => {
  const [formData, setFormData] = useState({
    epastas: '',
    slaptazodis: '',
    vardas: '',
    pavarde: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser({ ...formData, role_id: 3 });
      setMessage(data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="epastas" placeholder="Email" value={formData.epastas} onChange={handleChange} required />
        <input type="password" name="slaptazodis" placeholder="Password" value={formData.slaptazodis} onChange={handleChange} required />
        <input type="text" name="vardas" placeholder="First Name" value={formData.vardas} onChange={handleChange} required />
        <input type="text" name="pavarde" placeholder="Last Name" value={formData.pavarde} onChange={handleChange} required />
        <button type="submit">Add Librarian</button>
      </form>
    </div>
  );
};

export default AddLibrarianForm;

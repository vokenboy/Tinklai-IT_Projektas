import React, { useState } from 'react';
import { registerUser } from '../../api/authApi';
import './form.css';

const UserRegisterForm = () => {
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
      const data = await registerUser({ ...formData, role_id: 2 });
      setMessage(data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Registracija nepavyko');
    }
  };

  return (
    <div className="user-register-form-container">
      {message && <p className="error-message">{message}</p>}
      <form className="user-register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="epastas"
          placeholder="El. Paštas"
          value={formData.epastas}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="slaptazodis"
          placeholder="Slaptažodis"
          value={formData.slaptazodis}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="vardas"
          placeholder="Vardas"
          value={formData.vardas}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="pavarde"
          placeholder="Pavardė"
          value={formData.pavarde}
          onChange={handleChange}
          required
        />
        <button className="button" type="submit">Registruotis</button>
      </form>
    </div>
  );
};

export default UserRegisterForm;

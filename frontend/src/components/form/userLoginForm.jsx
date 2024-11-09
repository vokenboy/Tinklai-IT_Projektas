import React, { useState } from 'react';
import { loginUser } from '../../api/authApi';
import './form.css';

const UserLoginForm = () => {
  const [formData, setFormData] = useState({
    epastas: '',
    slaptazodis: ''
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
      const data = await loginUser(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role_id', data.role_id);
      localStorage.setItem('user_id', data.user_id);
      setMessage('Prisijungimas sėkmingas');
      window.location.href = '/';
    } catch (error) {
      setMessage(error.response?.data?.error || 'Prisijungimas nepavyko');
    }
  };

  return (
    <div className="user-login-form-container">
      {message && <p className="error-message">{message}</p>}
      <form className="user-login-form" onSubmit={handleSubmit}>
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
        <button className="button" type="submit">Prisijungti</button>
      </form>
    </div>
  );
};

export default UserLoginForm;

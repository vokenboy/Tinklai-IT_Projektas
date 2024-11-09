import React, { useState } from 'react';
import { loginUser } from '../../api/authApi';

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
      setMessage('Login successful!');
      window.location.href = '/';
    } catch (error) {
      setMessage(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="epastas" 
          placeholder="Email" 
          value={formData.epastas} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="slaptazodis" 
          placeholder="Password" 
          value={formData.slaptazodis} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default UserLoginForm;

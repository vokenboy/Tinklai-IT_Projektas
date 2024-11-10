import React from 'react';
import './deleteButton.css';

const DeleteButton = ({ onClick }) => {
  return (
    <button className="delete-button" onClick={onClick}>
      Ištrinti
    </button>
  );
};

export default DeleteButton;

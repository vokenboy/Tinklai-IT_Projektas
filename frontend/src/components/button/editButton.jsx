import React from 'react';
import './editButton.css';

const EditButton = ({ onClick }) => {
  return (
    <button className="edit-button" onClick={onClick}>
      Redaguoti
    </button>
  );
};

export default EditButton;

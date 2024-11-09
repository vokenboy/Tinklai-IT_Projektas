import React from 'react';
import './buttonNotification.css';

const ButtonNotification = ({ onClick, label }) => {
  return (
    <button className="button-not" onClick={onClick}>
      {label}
    </button>
  );
};

export default ButtonNotification;

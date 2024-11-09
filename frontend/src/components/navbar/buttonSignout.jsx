import React from 'react';
import './buttonSignout.css';

const ButtonSignout = ({ onClick, label }) => {
  return (
    <button className="button-signout" onClick={onClick}>
      {label}
    </button>
  );
};

export default ButtonSignout;

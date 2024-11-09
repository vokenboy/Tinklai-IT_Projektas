import React from 'react';

const Notification = () => {
  const notifications = [
    { message: 'Return Book A by tomorrow.' },
    { message: 'Book B is due today!' },
  ];

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>{notif.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;

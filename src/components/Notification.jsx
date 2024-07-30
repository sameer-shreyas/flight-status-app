import React from 'react';

const Notification = ({ message }) => {
  return (
    <div className="notification bg-blue-100 border border-blue-300 text-blue-800 p-3 rounded-md shadow-sm">
      <p>{message}</p>
    </div>
  );
};

export default Notification;

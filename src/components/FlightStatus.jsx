import React from 'react';

const FlightStatus = ({ flight }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // or use any other formatting you prefer
  };

  return (
    <div className="flight-status bg-white border border-gray-200 rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold text-gray-800">{flight.flightNumber}</h2>
      <p className="text-gray-600">Status: <span className={`font-semibold ${flight.status === 'On Time' ? 'text-green-600' : 'text-red-600'}`}>{flight.status}</span></p>
      <p className="text-gray-600">Departure: {formatDate(flight.departureTime)}</p>
      <p className="text-gray-600">Arrival: {formatDate(flight.arrivalTime)}</p>
      <p className="text-gray-600">Gate: {flight.gate}</p>
    </div>
  );
};

export default FlightStatus;

// src/components/Organizers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Organizers = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments'); // Adjust based on your API route
        setAppointments(response.data);
      } catch (err) {
        setError('Failed to fetch appointments.');
        console.error(err);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="organizers-container">
      <h2>Your Appointments</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id}>
              <strong>Day:</strong> {appointment.day}, 
              <strong> Start Time:</strong> {appointment.startTime}, 
              <strong> End Time:</strong> {appointment.endTime}, 
              <strong> Pounds:</strong> {appointment.pounds}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Organizers;

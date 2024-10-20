import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming axios is used for API requests

const Restaurants = () => {
  const [day, setDay] = useState(''); // State for the appointment day
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [pounds, setPounds] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [appointments, setAppointments] = useState([]); // State to hold fetched appointments
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [isEditing, setIsEditing] = useState(false); // State to track if an appointment is being edited
  const [editingId, setEditingId] = useState(null); // State to track the appointment being edited

  // Fetch appointments from MongoDB when the component mounts
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments'); // Assuming this route returns appointments
        setAppointments(response.data); // Set appointments to the response data
      } catch (err) {
        console.error('Error fetching appointments:', err);
      }
    };

    fetchAppointments();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!day || !startTime || !endTime || !pounds) {
      setError('All fields are required.');
      return;
    }

    const newAppointment = { day, startTime, endTime, pounds, driver: '' };

    try {
      if (isEditing) {
        // Edit existing appointment
        const response = await axios.put(`/api/appointments/${editingId}`, newAppointment);
        setAppointments(
          appointments.map((appointment) =>
            appointment._id === editingId ? { ...newAppointment, _id: editingId } : appointment
          )
        );
        setSuccess('Appointment updated successfully!');
      } else {
        // Add new appointment
        const response = await axios.post('/api/appointments', newAppointment);
        setAppointments([...appointments, response.data]); // Add new appointment to the list
        setSuccess('Appointment added successfully!');
      }

      // Clear form and state
      setDay('');
      setStartTime('');
      setEndTime('');
      setPounds('');
      setShowForm(false);
      setIsEditing(false);
      setEditingId(null);
      setError('');
    } catch (err) {
      setError('Failed to process appointment. Please try again.');
      setSuccess('');
    }
  };

  const handleEdit = (appointment) => {
    setIsEditing(true);
    setEditingId(appointment._id);
    setDay(appointment.day);
    setStartTime(appointment.startTime);
    setEndTime(appointment.endTime);
    setPounds(appointment.pounds);
    setShowForm(true);
  };

  const handleCancel = async (id) => {
    try {
      await axios.delete(`/api/appointments/${id}`);
      setAppointments(appointments.filter((appointment) => appointment._id !== id));
      setSuccess('Appointment canceled successfully!');
    } catch (err) {
      setError('Failed to cancel appointment. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="restaurants-container">
      <h2>Restaurants</h2>

      {/* Add/Edit Appointment Button */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : isEditing ? 'Edit Appointment' : 'Add Appointment'}
      </button>

      {/* Show form only if showForm is true */}
      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <label>
            Day:
            <input
              type="text"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              placeholder="Enter appointment day (e.g. 2024-10-20)"
            />
          </label>
          <label>
            Start Time:
            <input
              type="text"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="Enter start time"
            />
          </label>
          <label>
            End Time:
            <input
              type="text"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              placeholder="Enter end time"
            />
          </label>
          <label>
            Pounds:
            <input
              type="number"
              value={pounds}
              onChange={(e) => setPounds(e.target.value)}
              placeholder="Enter pounds"
            />
          </label>
          <button type="submit">{isEditing ? 'Update Appointment' : 'Add Appointment'}</button>
        </form>
      )}

      {/* Error and success messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* Display Appointments */}
      <h3>Your Appointments</h3>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id}>
              <strong>Day:</strong> {appointment.day}, 
              <strong> Start Time:</strong> {appointment.startTime}, 
              <strong> End Time:</strong> {appointment.endTime}, 
              <strong> Pounds:</strong> {appointment.pounds}
              <button onClick={() => handleEdit(appointment)}>Edit</button>
              <button onClick={() => handleCancel(appointment._id)}>Cancel</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Restaurants;

import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, List, ListItem, ListItemText, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios'; // Import Axios
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Restaurant = () => {
  const [date, setDate] = useState('');
  const [pickTime, setPickTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [pound, setPound] = useState('');
  const [appointments, setAppointments] = useState([]); // State to hold fetched appointments

  // New state for checkboxes
  const [isUnder4Hours, setIsUnder4Hours] = useState(false);
  const [isChilledTo30Degrees, setIsChilledTo30Degrees] = useState(false);

  const navigate = useNavigate();
  const userId = auth.currentUser?.uid; // Get the current user's ID
  const userName = auth.currentUser?.displayName || 'User'; // Fallback if displayName is not available

  // Function to fetch appointments
  const fetchAppointments = async () => {
    if (!userId) return; // Exit if userId is not available

    try {
      const response = await axios.get(`http://127.0.0.1:5000/appointment/get/${userId}`); // Replace with your actual endpoint
      setAppointments(response.data); // Set appointments state
    } catch (error) {
      console.error('Error fetching appointments:', error);
      // Handle error (e.g., show error message)
    }
  };

  // Call fetchAppointments when the component mounts
  useEffect(() => {
    fetchAppointments();
  }, [userId]);

  const handleSubmit = async () => {
    // Check if userId is available
    if (!userId) {
      console.error('Error: User ID not found.');
      return; // Exit the function if userId is not available
    }

    try {
      const response = await axios.post(`http://127.0.0.1:5000/appointment/add`, {
        id : userId,
        day : date,
        start_time : pickTime,
        end_time : closeTime,
        pounds : pound,
      });
      console.log('Response:', response.data);

      navigate('/submission');

      // Reset form fields after submission
      setDate('');
      setPickTime('');
      setCloseTime('');
      setPound('');
      setIsUnder4Hours(false); // Reset checkbox
      setIsChilledTo30Degrees(false); // Reset checkbox

      // Fetch updated appointments
      fetchAppointments();
    } catch (error) {
      console.error('Error posting data:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="white-container">
      <div className="white-text">
        <h2 style={{ textAlign: 'center' }}>
          Thank You {userName} For Being A Partner, Please Create A Ticket For Our Volunteer
        </h2>

        <div style={{ marginBottom: '16px', marginTop: '16px' }}>
          <TextField
            label="Date"
            type="date"
            variant="outlined"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            sx={{ marginBottom: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Pickup Time"
            variant="outlined"
            fullWidth
            value={pickTime}
            onChange={(e) => setPickTime(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Close Time"
            variant="outlined"
            fullWidth
            value={closeTime}
            onChange={(e) => setCloseTime(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Pound"
            variant="outlined"
            fullWidth
            value={pound}
            onChange={(e) => setPound(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </div>

        {/* Checkboxes for additional conditions */}
        <div style={{ marginTop: '16px' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isUnder4Hours}
                onChange={(e) => setIsUnder4Hours(e.target.checked)}
                color="primary" // Checkbox color
              />
            }
            label="Food was out for no more than 4 hours"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isChilledTo30Degrees}
                onChange={(e) => setIsChilledTo30Degrees(e.target.checked)}
                color="primary" // Checkbox color
              />
            }
            label="Food was chilled to 30 degrees"
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          disabled={
            !date || !pickTime || !closeTime || !pound || 
            !isUnder4Hours || !isChilledTo30Degrees // Disable if any condition is not met
          }
        >
          Submit
        </Button>

        {/* Displaying the appointments */}
        <div style={{ marginTop: '32px' }}>
          <Typography variant="h6" gutterBottom>
            Your Appointments
          </Typography>
          <List>
            {appointments.map((appointment, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Date: ${appointment.date}, Pickup: ${appointment.pickTime}, Close: ${appointment.closeTime}, Pounds: ${appointment.pound}`}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;

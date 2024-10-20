import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios'; 
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Volunteer = () => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [user] = useAuthState(auth); // Use useAuthState to get the current user

  const userName = user ? user.displayName : ''; // Ensure user is not null

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:5000/appointment/volunteer/add`, {
        userName, 
        city,
        state,
      });
      
      console.log('Response from server:', response.data);
      // You can perform further actions like saving data to a database
    } catch (error) {
      console.error('Error submitting volunteer data:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="white-container">
      <div className="white-text">
        <h2 style={{ textAlign: 'center' }}>
          Thank You For Volunteering, Please Indicate Where You Are From To Get Started
        </h2>

        <div style={{ marginBottom: '16px', marginTop: '16px' }}>
          <TextField
            label="City (e.g. Providence)"
            variant="outlined"
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="State (e.g. RI)"
            variant="outlined"
            fullWidth
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          disabled={!city || !state} // Disable button if either field is empty
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Volunteer;

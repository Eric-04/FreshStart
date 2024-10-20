import React, { useState } from 'react';
import axios from 'axios'; 
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Volunteer = () => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [user] = useAuthState(auth); // Use useAuthState to get the current user
  const userName = user ? user.displayName : ''; // Ensure user is not null
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:5000/volunteer/add`, {
        userName, 
        city,
        state,
      });
      
      console.log('Response from server:', response.data);
      navigate('/map-display'); // Navigate to the map display after successful submission
    } catch (error) {
      console.error('Error submitting volunteer data:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="white-container">
      <div className="white-text">
        <Typography variant="h5" align="center">
          Thank You For Volunteering, Please Indicate Where You Are From To Get Started
        </Typography>

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

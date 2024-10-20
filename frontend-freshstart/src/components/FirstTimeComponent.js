import React, { useState } from 'react';
import { Button, Menu, MenuItem, TextField, Box } from '@mui/material';
import axios from 'axios';

function FirstTimeComponent() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelection = (role) => {
    setSelectedRole(role);
    handleClose(); // Close the dropdown after selection
  };

  const showNextButton = selectedRole !== '';
  const isNextButtonDisabled = selectedRole !== '' && (selectedRole === 'Organizer' || selectedRole === 'Restaurant')
    ? name.trim() === '' || address.trim() === '' || city.trim() === '' || state.trim() === ''
    : false;


    const handleSubmit = async () => {
      try {
        const response = await axios.post('http://your-flask-api-url/api/save', {
          name,
          address,
          city,
          state,
          role: selectedRole, // Send the selected role as well
        });
        console.log('Data saved successfully:', response.data);
        // Optionally reset the form fields after successful submission
        setName('');
        setAddress('');
        setCity('');
        setState('');
        setSelectedRole('');
        setAnchorEl(null);
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };
    
  return (
    <Box>
      <Button variant="contained" onClick={handleClick}>
        {selectedRole === '' ? 'Choose...' : `Selected: ${selectedRole}`} {/* Update button text based on selection */}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleSelection('Volunteer')}>Volunteer</MenuItem>
        <MenuItem onClick={() => handleSelection('Organizer')}>Organizer</MenuItem>
        <MenuItem onClick={() => handleSelection('Restaurant')}>Restaurant</MenuItem>
      </Menu>
      {(selectedRole === 'Organizer' || selectedRole === 'Restaurant') && (
        <Box sx={{ marginTop: 2 }}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="St. Address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
            <TextField
            label="City"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        <TextField
            label="State"
            variant="outlined"
            value={state}
            onChange={(e) => setState(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        </Box>
      )}
      {showNextButton && (
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            justifyContent: 'flex-end', // Align the button to the right
          }}
        >
          <Button 
            variant="contained" 
            color="primary" 
            disabled={isNextButtonDisabled}
            onClick={handleSubmit}
          >
            Continue {/* Display selected role in the button text */}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default FirstTimeComponent;

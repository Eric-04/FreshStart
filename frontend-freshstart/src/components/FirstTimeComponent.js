import React, { useState } from 'react';
import { Button, Menu, MenuItem, TextField, Box } from '@mui/material';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

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
  const isNextButtonDisabled = selectedRole !== '' && 
  (selectedRole === 'Organization' || selectedRole === 'Restaurant')
  ? name.trim() === '' || address.trim() === '' || city.trim() === '' || state.trim() === ''
  : false;

  const handleSubmit = async () => {
    const user = auth.currentUser;
    console.log('Current user:', user);

    let fill = ''; // Initialize fill variable

    // Use `if` statements with proper syntax
    if (selectedRole === 'Organization') {
      fill = 'organization'; // Fixed spelling of 'organization'
    } else if (selectedRole === 'Restaurant') {
      fill = 'restaurant';
    }


    try {
      // Add selected role to Firestore
      const userRef = doc(db, 'users', user.uid); // Replace 'user-id' with the actual user ID or reference
      await setDoc(userRef, {
        role: selectedRole, // Save the selected role
      }, { merge: true });

      const response = await axios.post(`http://127.0.0.1:5000/${fill}/add`, {
        name,
        address,
        city,
        state,
      });
      console.log('Data saved successfully:', response.data);
      

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
        <MenuItem onClick={() => handleSelection('Organization')}>Organization</MenuItem>
        <MenuItem onClick={() => handleSelection('Restaurant')}>Restaurant</MenuItem>
      </Menu>
      {(selectedRole === 'Organization' || selectedRole === 'Restaurant') && (
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

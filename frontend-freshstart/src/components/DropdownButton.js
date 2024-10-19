// src/components/DropdownButton.js
import React, { useState } from 'react';
import { Button, Menu, MenuItem, TextField, Box } from '@mui/material';

function DropdownButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

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
    ? name.trim() === '' || address.trim() === ''
    : false;

  return (
    <Box>
      <Button variant="contained" onClick={handleClick}>
        Choose...
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
            label="Address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
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
          >
            Next as {selectedRole} {/* Display selected role in the button text */}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default DropdownButton;

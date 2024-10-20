import React, { useState } from 'react'; 
import { Button, Menu, MenuItem, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
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
  const [pickTime, setPickTime] = useState('');
  const [closeTime, setCloseTime] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelection = (role) => {
    setSelectedRole(role);
    handleClose();
  };

  const showNextButton = selectedRole !== '';

  const isNextButtonDisabled =
  selectedRole === 'Volunteer' ? false : // Enable button for Volunteer
  selectedRole !== '' && (
      (selectedRole === 'Organization' || selectedRole === 'Restaurant') &&
      (name.trim() === '' ||
       address.trim() === '' ||
       city.trim() === '' ||
       state.trim() === '' ||
       (selectedRole === 'Organization' && (pickTime.trim() === '' || closeTime.trim() === '')))
  );

  const handleSubmit = async () => {
    const user = auth.currentUser;
    console.log('Current user:', user);

    if (selectedRole === 'Volunteer') {
      // If the role is Volunteer, simply save the role to Firestore
      try {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          role: selectedRole,
        }, { merge: true });

        console.log('Volunteer role saved successfully.');

        // Navigate to the volunteer page
        navigate('/volunteer');

        // Reset all fields after saving
        setName('');
        setAddress('');
        setCity('');
        setState('');
        setSelectedRole('');
        setPickTime('');
        setCloseTime('');
        setAnchorEl(null);


      } catch (error) {
        console.error('Error saving data for volunteer:', error);
      }
      return; // Exit the function since we don't need to post data for volunteer
    }

    let fill = '';

    if (selectedRole === 'Organization') {
      fill = 'organization';
    } else if (selectedRole === 'Restaurant') {
      fill = 'restaurant';
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        role: selectedRole,
      }, { merge: true });

      const response = await axios.post(`http://127.0.0.1:5000/${fill}/add`, {
        name,
        address,
        city,
        state,
        selectedRole,
        pickTime: selectedRole === 'Organization' ? pickTime : undefined,
        closeTime: selectedRole === 'Organization' ? closeTime : undefined,
      });

      console.log('Data saved successfully:', response.data);

      // Reset all fields after saving
      setName('');
      setAddress('');
      setCity('');
      setState('');
      setSelectedRole('');
      setPickTime('');
      setCloseTime('');
      setAnchorEl(null);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleClick}>
        {selectedRole === '' ? 'Choose...' : `Selected: ${selectedRole}`}
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
            label="St. Address (e.g. 69 Brown St.)"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="City (e.g. Providence)"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="State (e.g. RI)"
            variant="outlined"
            value={state}
            onChange={(e) => setState(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />

          {/* Show time fields only if the selected role is Organization */}
          {selectedRole === 'Organization' && (
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
              <TextField
                label="Opening Window Time (e.g. 16:00)"
                variant="outlined"
                value={pickTime}
                onChange={(e) => setPickTime(e.target.value)}
                sx={{ width: '50%' }}
              />
              <TextField
                label="Closing Window Time (e.g. 18:00)"
                variant="outlined"
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
                sx={{ width: '50%' }}
              />
            </Box>
          )}
        </Box>
      )}
      {showNextButton && (
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button 
            variant="contained" 
            color="primary" 
            disabled={isNextButtonDisabled}
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default FirstTimeComponent;

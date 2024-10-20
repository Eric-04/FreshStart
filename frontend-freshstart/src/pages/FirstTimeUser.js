// src/pages/FirstTimeUser.js
import React, { useState } from 'react';
import { db } from '../firebase'; // Import your Firebase config
import { collection, addDoc } from 'firebase/firestore';
import './Layout.css'; 
import FirstTimeComponent from '../components/FirstTimeComponent';

function FirstTimeUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Add user to Firestore
      await addDoc(collection(db, 'users'), {
        name,
        email,
      });
      setSuccess('User saved successfully!');
      setError('');
      setName(''); // Clear input fields
      setEmail('');
    } catch (err) {
      setError('Failed to save user. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="white-container">
      <div className="white-text">
        <h2>Thank You For Choosing FreshStart!</h2>
        <h2>I am a...</h2>
        <FirstTimeComponent />
      </div>
      <form onSubmit={handleSubmit} className="user-form">

      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default FirstTimeUser;


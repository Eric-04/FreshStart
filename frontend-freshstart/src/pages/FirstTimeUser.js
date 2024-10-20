import React from 'react';
import './FirstTimeUser.css'; 
import DropdownButton from '../components/FirstTimeComponent';


function FirstTimeUser() {
  return (
    <div className="first-time-user-container">
        <div className="first-time-user-text">
        <h2>Thank You For Choosing FreshStart!</h2>
        <h2>I am a...</h2>
        <DropdownButton />
        </div>
    </div>
  );
}

export default FirstTimeUser;



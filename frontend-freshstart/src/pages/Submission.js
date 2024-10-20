import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Confetti from 'react-confetti';

const Submission = () => {


  return (
    <div className="white-container">
      <Confetti />
      <div className="white-text" style={{ textAlign: 'center' }}>
        <h2>Thank You For Your Contribution!</h2>
      </div>
    </div>
  );
};

export default Submission;

// Navbar.js
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth } from './firebase'; // Ensure the import path is correct
import './Navbar.css'; // Optional: Include your styles

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate(); // Initialize navigate

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const signOut = async () => {
    await auth.signOut(); // Sign the user out
    navigate('/'); // Navigate to the Welcome page
  };

  const goToAbout = () => {
    navigate('/about'); // Navigate to the About page
  };
  const goToHome = () => {
    navigate('/'); // Navigate to the About page
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">FreshStart</h1>
      <div className="navbar-links">
      <button onClick={goToHome} className="about-button">
          Home
        </button>
        <button onClick={goToAbout} className="about-button">
          About
        </button>
        {user ? (
          <>
            <button onClick={signOut} className="sign-in-button">Sign Out</button>
          </>
        ) : (
          <button onClick={signInWithGoogle} className="sign-in-button">
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Import getDoc to retrieve user role
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth, db } from './firebase'; // Ensure the import path is correct
import './Navbar.css'; // Optional: Include your styles

const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const [userRole, setUserRole] = useState(null); // State to store user role
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserRole(userData.role); // Set user role state
        }
      }
    };

    fetchUserRole();
  }, [user]);

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

  // Update goToHome to redirect based on login status and user role
  const goToHome = () => {
    if (!user) {
      navigate('/'); // Go to home if not logged in
    } else if (!userRole) {
      navigate('/first-time'); // Go to first-time page if no role
    } else if (userRole === 'Volunteer') {
      navigate('/volunteer'); // Go to volunteer page
    } else if (userRole === 'Organization') {
      navigate('/organizers'); // Go to organizer page
    } else if (userRole === 'Restaurant') {
      navigate('/restaurants'); // Go to restaurants page
    }
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
        {loading ? ( // Show a loading state while checking user status
          <button className="sign-in-button" disabled>
            Loading...
          </button>
        ) : user ? (
          <button onClick={signOut} className="sign-in-button">
            Sign Out
          </button>
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

import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';

const Welcome = () => {
  const [user, loading] = useAuthState(auth);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      console.error("Error signing in with Google", error);
    });
  };

  const signOut = () => {
    auth.signOut();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return (
      <div>
        <h1>Welcome, {user.displayName}!</h1>
        <p>You're now signed in.</p>
        <button onClick={signOut}>Sign Out</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Welcome to Our App!</h1>
        <p>Please sign in to continue:</p>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
    );
  }
};

export default Welcome;
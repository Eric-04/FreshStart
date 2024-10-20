import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth, db } from '../firebase';

const Welcome = () => {
 const [user, loading] = useAuthState(auth);
 const navigate = useNavigate(); // Initialize navigate


 useEffect(() => {
   const checkUserLevel = async () => {
     if (user) {
       // Reference to the user's document in Firestore
       const userRef = doc(db, 'users', user.uid);
      
       // Get user document
       const docSnap = await getDoc(userRef);
       if (docSnap.exists()) {
         const userData = docSnap.data();
         // Check if level exists
         if (!userData.level) {
           navigate('/first-time'); // Navigate to FirstTimeUser page
         }
       } else {
         // If the user document does not exist, create it
         await setDoc(userRef, {
           uid: user.uid,
           displayName: user.displayName,
           email: user.email,
         }, { merge: true }).catch((error) => {
           console.error("Error adding user to Firestore:", error);
         });
       }
     }
   };


   checkUserLevel();
 }, [user, navigate]);


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


 return (
   <div>
     {user ? (
       <>
         <h1>Welcome, {user.displayName}!</h1>
         <p>You're now signed in.</p>
         <button onClick={signOut}>Sign Out</button>
       </>
     ) : (
       <>
         <h1>Welcome to Our App!</h1>
         <p>Please sign in to continue:</p>
         <button onClick={signInWithGoogle}>Sign in with Google</button>
       </>
     )}
   </div>
 );
};

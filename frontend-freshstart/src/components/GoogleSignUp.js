import React from "react";
import { auth } from "../firebase"; 
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function GoogleSignUp() {
    const handleGoogleSignUp = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Signed up with Google:", user);
            alert(`Welcome, ${user.displayName}!`);
            // Redirect or perform other actions here
        } catch (error) {
            // Log detailed error information
            console.error("Google sign-up failed:", error.code, error.message);
            alert("Failed to sign up with Google. Please try again.");
        }
    };

    return (
        <div>
            <button onClick={handleGoogleSignUp}>Sign Up with Google</button>
        </div>
    );
}

export default GoogleSignUp;

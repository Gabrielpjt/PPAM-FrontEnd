import React, { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { signUp } from '../util/auth'; // Mengubah import dan memperbaiki path

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signupHandler(email, password) {
    setIsAuthenticating(true);  
    try {
      await signUp(email, password); // Menggunakan signUp dari utils/auth
      setIsAuthenticating(false);
    } catch (error) {
      console.error('Sign up error', error);
      setIsAuthenticating(false); // Pastikan untuk menghentikan loading overlay pada kasus error
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..."/>;
    // Pastikan prop-nya bernama message, bukan messages
  }

  return <AuthContent onAuthenticate={signupHandler}/>;
}

export default SignupScreen;

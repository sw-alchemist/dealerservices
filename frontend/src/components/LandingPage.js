import React, { useState } from 'react';
import HeroImage from '../assets/HeroImage.HEIC';
import SignupForm from './SignupForm';

function LandingPage() {
  const [showSignup, setShowSignup] = useState(false);

  const handleSignupClick = () => {
    setShowSignup(true);
  };

  const handleSignupClose = () => {
    setShowSignup(false);
  };
  return (
    <div style={styles.container}>
      <img src={HeroImage} alt="Dealership Management" style={styles.image} />
      <h1 style={styles.title}>Welcome to Dealership Management</h1>
      <div style={styles.buttons}>
        <button style={styles.button} onClick={handleSignupClick}>Sign Up</button>
        <button style={styles.button}>Login</button>
      </div>
      {showSignup && <SignupForm onClose={handleSignupClose} />}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '300px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  buttons: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default LandingPage;

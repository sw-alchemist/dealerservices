import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import WelcomeModal from './WelcomeModal';
import axios from 'axios';

function App() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTutorialStatus = async () => {
      try {
        const response = await axios.get('/api/users/me');
        if (!response.data.tutorialCompleted) {
          setShowWelcomeModal(true);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    checkTutorialStatus();
  }, []);

  const handleCloseModal = () => {
    setShowWelcomeModal(false);
  };

  const handleDontShowAgain = async () => {
    try {
      await axios.put('/api/users/tutorial-completed');
      setShowWelcomeModal(false);
    } catch (error) {
      console.error('Error updating tutorial status:', error);
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <WelcomeModal
        show={showWelcomeModal}
        onClose={handleCloseModal}
        onDontShowAgain={handleDontShowAgain}
      />
    </>
  );
}

export default App;

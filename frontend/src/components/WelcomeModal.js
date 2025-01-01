import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const WelcomeModal = ({ show, onClose, onDontShowAgain }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Welcome to Dealership Service!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>We're excited to have you on board. Here's a quick overview of what you can do:</p>
        <ul>
          <li>Manage your dealership information</li>
          <li>Track service requests</li>
          <li>View analytics and reports</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onDontShowAgain}>
          Close & Don't Show Again
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WelcomeModal;

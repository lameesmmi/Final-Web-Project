// Importing necessary components, libraries, pages 
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom'; // For navigation and getting guide name

const ReachOutForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const guideName = location.state?.guideName || 'Your Guide'; // fallback

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    preferredDate: '',
    groupSize: '',
    message: ''
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    console.log('Form submitted:', formData);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      preferredDate: '',
      groupSize: '',
      message: ''
    });
    navigate('/Home'); // Redirect after closing
  };

  return (
    <div style={{
      backgroundColor: '#e5e3d4',
      borderRadius: '10px',
      padding: '20px',
      color: 'black',
      maxWidth: '600px',
      margin: '70px auto',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 className="text-center">Reach Out to {guideName}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPreferredDate">
          <Form.Label>What is Your Preferred Date?</Form.Label>
          <Form.Control
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formGroupSize">
          <Form.Label>What is Your Group Size?</Form.Label>
          <Form.Control
            type="number"
            name="groupSize"
            value={formData.groupSize}
            onChange={handleChange}
            required
            min="1"
          />
        </Form.Group>

        <Form.Group controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="message"
            value={formData.message}
            onChange={handleChange}
            style={{ marginBottom: '20px' }}
          />
        </Form.Group>

        <Button
          style={{ backgroundColor: '#9abf80', borderColor: '#9abf80', color: 'black' }}
          type="submit"
          className="w-100"
        >
          Send
        </Button>
      </Form>

      {/* Modal for Confirmation */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Submission Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your message has been sent successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReachOutForm;

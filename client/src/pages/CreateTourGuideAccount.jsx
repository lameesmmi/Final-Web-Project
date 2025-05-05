// Path: src/pages/CreateTourGuideAccount.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccountForm.css';

const CreateTourGuideAccount = () => {
  const navigate = useNavigate();

  // State for form fields including confirmPassword (only for frontend validation)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    nationalId: '',
    phoneNumber: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate input before submitting
  const validateForm = () => {
    const { username, email, password, confirmPassword, firstName, lastName, nationalId, phoneNumber } = formData;

    if (!username || !email || !password || !confirmPassword || !firstName || !lastName || !nationalId || !phoneNumber) {
      return 'All fields are required';
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (password !== confirmPassword) return 'Passwords do not match';
    if (!/^\d{10}$/.test(nationalId)) return 'National ID must be exactly 10 digits';
    if (!/^05\d{8}$/.test(phoneNumber)) return 'Phone number must start with 05 and be 10 digits long';

    return '';
  };

  // Submit the form and send to backend (excluding confirmPassword)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      return;
    }

    setErrorMessage('');
    const { confirmPassword, ...payload } = formData; // Exclude confirmPassword

    try {
      const response = await fetch('/guides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to create account');

      alert('Tour Guide account created successfully!');
      setTimeout(() => navigate('/Login'), 2000);
    } catch (err) {
      console.error('Error:', err);
      setErrorMessage('Something went wrong while creating your account.');
    }
  };

  return (
    <div className="account-form">
      <img src="../jadwill logo.png" alt="Jaddwill Logo" className="page-logo" />
      <h1 className="account-form-title">Create Account</h1>
      <p className="account-form-subtitle">As a Tour guide</p>

      <form onSubmit={handleSubmit} noValidate>
        {[
          { label: 'Username', name: 'username', type: 'text', placeholder: 'e.g., tour_guide_123' },
          { label: 'Email', name: 'email', type: 'email', placeholder: 'e.g., guide@example.com' },
          { label: 'Password', name: 'password', type: 'password', placeholder: 'Min 6 characters' },
          { label: 'Confirm Password', name: 'confirmPassword', type: 'password', placeholder: 'Retype your password' },
          { label: 'First Name', name: 'firstName', type: 'text', placeholder: 'e.g., Ahmed' },
          { label: 'Last Name', name: 'lastName', type: 'text', placeholder: 'e.g., Al-Qahtani' },
          { label: 'National ID', name: 'nationalId', type: 'text', placeholder: 'e.g., 1234567890', maxLength: 10 },
          { label: 'Phone Number', name: 'phoneNumber', type: 'tel', placeholder: 'e.g., 05XXXXXXXX', maxLength: 10 }
        ].map(({ label, name, ...rest }) => (
          <div className="input-pair" key={name}>
            <label>{label}</label>
            <input name={name} value={formData[name]} onChange={handleChange} {...rest} />
          </div>
        ))}

        {errorMessage && (
          <p style={{ color: 'red', gridColumn: 'span 2', textAlign: 'center' }}>
            {errorMessage}
          </p>
        )}

        <button type="submit" className="create-btn">Create</button>
      </form>
    </div>
  );
};

export default CreateTourGuideAccount;

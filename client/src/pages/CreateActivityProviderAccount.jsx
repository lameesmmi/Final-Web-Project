// Path: src/pages/CreateActivityProviderAccount.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccountForm.css';

const CreateActivityProviderAccount = () => {
  const navigate = useNavigate();

  // Frontend form state, includes confirmPassword for validation only
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    maaroofNumber: '',
    phoneNumber: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  // Update form state dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Frontend validation before sending data
  const validateForm = () => {
    const { companyName, email, password, confirmPassword, maaroofNumber, phoneNumber } = formData;

    if (!companyName || !email || !password || !confirmPassword || !maaroofNumber || !phoneNumber) {
      return 'All fields are required';
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (password !== confirmPassword) return 'Passwords do not match';

    const maaroofRegex = /^\d+$/;
    if (!maaroofRegex.test(maaroofNumber)) return 'Maaroof number must contain only digits';

    const phoneRegex = /^05\d{8}$/;
    if (!phoneRegex.test(phoneNumber)) return 'Phone number must start with 05 and be 10 digits long';

    return '';
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      return;
    }

    setErrorMessage('');
    const { confirmPassword, ...dataToSend } = formData; // Do NOT send confirmPassword to backend

    try {
      const response = await fetch('/providers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error('Failed to create account');

      alert('Activity Provider account created successfully!');
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
      <p className="account-form-subtitle">As an Activity Provider</p>

      <form onSubmit={handleSubmit} noValidate>
        {[
          { label: 'Company Name', name: 'companyName', placeholder: 'e.g., Adventure Arabia' },
          { label: 'Email', name: 'email', placeholder: 'e.g., provider@example.com' },
          { label: 'Password', name: 'password', placeholder: 'Min 6 characters', type: 'password' },
          { label: 'Confirm Password', name: 'confirmPassword', placeholder: 'Retype your password', type: 'password' },
          { label: 'Maaroof Number', name: 'maaroofNumber', placeholder: 'e.g., 987654' },
          { label: 'Phone Number', name: 'phoneNumber', placeholder: 'e.g., 05XXXXXXXX', maxLength: 10 }
        ].map(({ label, name, type = 'text', ...rest }) => (
          <div className="input-pair" key={name}>
            <label>{label}</label>
            <input type={type} name={name} value={formData[name]} onChange={handleChange} {...rest} />
          </div>
        ))}

        {errorMessage && <p style={{ color: 'red', gridColumn: 'span 2', textAlign: 'center' }}>{errorMessage}</p>}
        <button type="submit" className="create-btn">Create</button>
      </form>
    </div>
  );
};

export default CreateActivityProviderAccount;

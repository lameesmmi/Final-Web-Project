// Path: src/pages/ResetPassword.jsx

import React, { useState } from 'react'; // Import React and useState hook
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for navigation
import './ResetPassword.css'; // Import the CSS styles for this component

const ResetPassword = () => {
  // State variables to track input fields
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State variables for showing messages
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate(); // Hook for programmatic navigation

  // Function to handle password reset submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    // Validate that passwords match
    if (newPassword !== confirmPassword) {
      setErrorMessage('The entered passwords do not match');
      setSuccessMessage('');
    }
    // Validate minimum password length
    else if (newPassword.length < 6) {
      setErrorMessage('The entered password is invalid (minimum 6 characters)');
      setSuccessMessage('');
    }
    // If validation passes
    else {
      setErrorMessage('');
      alert('Your password has been updated successfully!');

      // Redirect to Login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  return (
    <div className="reset-password-container">
      {/* Logo at the top */}
      <img 
        src="../jadwill logo.png" 
        alt="Jaddwill Logo" 
        className="page-logo"
      />

      {/* Page Title */}
      <h1 className="reset-password-title">Reset Password</h1>

      {/* Password Reset Form */}
      <form className="reset-password-form" onSubmit={handleSubmit}>

        {/* New Password Input Field */}
        <input
          type="password"
          id="newPassword"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="reset-password-input"
        />

        {/* Confirm Password Input Field */}
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="reset-password-input"
        />

        {/* Error Message Display */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Success Message Display */}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {/* Reset Password Button (disabled if fields are empty) */}
        <button
          type="submit"
          className="reset-password-button"
          disabled={!newPassword || !confirmPassword}
        >
          Reset Password
        </button>
      </form>

      {/* Link to go back to Login page */}
      <p className="back-to-login">
        <Link to="/Login">← Back to Login</Link>
      </p>
    </div>
  );
};

export default ResetPassword;

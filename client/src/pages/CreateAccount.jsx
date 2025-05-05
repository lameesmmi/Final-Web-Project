
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation between pages
import './CreateAccount.css'; // Import styles for Create Account page

const CreateAccount = () => {
  return (
    <div className="create-account-container">

      {/* Logo at the top left */}
      <img 
        src="../jadwill logo.png" 
        alt="Jaddwill Logo" 
        className="page-logo"
      />

      {/* Main page title */}
      <h1 className="create-account-title">Create Account</h1>

      {/* Container holding the 3 account type buttons */}
      <div className="create-account-buttons">

        {/* Tourist Registration Button */}
        <Link to="/CreateTouristAccount" className="create-account-button">
          <img
            src="/Tourist_Icon.png"
            alt="Tourist Icon"
            className="create-account-icon"
          />
          <span className="button-text-typeI">I'm a Tourist</span>
        </Link>

        {/* Tour Guide (Local) Registration Button */}
        <Link to="/CreateTourGuideAccount" className="create-account-button">
          <img
            src="/Tour_Guide_Icon.png"
            alt="Tour Guide Icon"
            className="create-account-icon"
          />
          <span className="button-text-typeI">I'm a Local</span>
        </Link>

        {/* Activity Provider Registration Button */}
        <Link to="/CreateActivityProviderAccount" className="create-account-button">
          <img
            src="/Activity_Provider.png"
            alt="Activity Provider Icon"
            className="create-account-icon"
          />
          {/* Activity provider button text (with line break) */}
          <span className="button-text-typeII">I'm an Activity <br /> Provider</span>
        </Link>
      </div>

      {/* Link for users who already have an account */}
      <p className="create-account-link">
        Already have an account? <Link to="/Login">Login</Link>
      </p>
    </div>
  );
};

export default CreateAccount;

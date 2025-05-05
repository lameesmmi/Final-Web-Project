import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfileCard = ({ image, name, bio, onClick, matchPath }) => {
  const navigate = useNavigate();

  const handleMatchClick = (e) => {
    e.stopPropagation(); // prevent triggering card click
    navigate(matchPath); // go to guide's page
  };

  return (
    <div className="p-3">
      <div
        className="card shadow-sm rounded-4 text-center p-3 user-profile-card"
        onClick={onClick}
        role="button"
        style={{
          cursor: 'pointer',
          maxWidth: '300px',
          transition: '0.3s',
          margin: '0 auto',
        }}
      >
        <img
          src={image}
          className="card-img-top rounded-circle mx-auto mt-3"
          alt={`${name}'s profile`}
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title fw-bold">{name}</h5>
          <p className="card-text text-muted">{bio}</p>
          <button className="btn btn-sm mt-3" onClick={handleMatchClick}>
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Tour({ tour }) {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      style={{
        width: '12rem',
        margin: '10px',
        borderColor: 'var(--green-color)',
        borderWidth: '3px',
        padding: '5px',
      }}
    >
      <div className="card-body" style={{ padding: '3px' }}>
        <h5 className="card-title">{tour.name}</h5>
        <p className="card-subtitle text-body-secondary">
          By: {tour.tourGuideUsername}
        </p>

        <p>Activities:</p>
        <ul>
          {tour.activityNames && tour.activityNames.length > 0 ? (
            tour.activityNames.map((name, index) => (
              <li key={index}>Event #{index + 1} – {name}</li>
            ))
          ) : (
            <li>No activities listed</li>
          )}
        </ul>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            type="button"
            id="evnt-details-button"
            className="btn guide-button"
            onClick={() => navigate(`/TourDetails/${tour._id}`)}
          >
            More details
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tour;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import axios from 'axios';
import MenuBar from '../components/MenuBar';
import instance from '../api/axiosInstance';

const TourDetails = () => {
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/About" },
    { label: "Profile", path: "/GuideProfile" },
    { label: "Dashboard", path: "/GuideDashboard" },
    { label: "Tour Center", path: "/TourCenter" },
  ];

  const { id } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await instance.get(`/tours/${id}`);
        setTour(response.data);
      } catch (error) {
        console.error('❌ Error fetching tour:', error);
      }
    };

    fetchTour();
  }, [id]);

  if (!tour) return <div className="text-center mt-5">Loading tour details...</div>;

  return (
    <div className="min-vh-100 bg-light">
      <MenuBar links={navLinks} />

      <div className="container d-flex justify-content-center py-5">
        <div className="card shadow-lg" style={{ maxWidth: '700px', width: '100%' }}>
          <div className="card-body text-center px-4 py-5">

            <h2 className="mb-4">
              <span role="img" aria-label="map">🗺️</span> Tour Details
            </h2>

            <div className="mb-4">
              <h5 className="fw-bold"><span role="img" aria-label="pin">📌</span> Name</h5>
              <p>{tour.name}</p>
            </div>

            <div className="mb-4">
              <h5 className="fw-bold"><span role="img" aria-label="guide">🧭</span> Tour Guide</h5>
              <p>{tour.tourGuideUsername}</p>
            </div>

            <div className="mb-4">
              <h5 className="fw-bold"><span role="img" aria-label="calendar">📅</span> Date & Time</h5>
              <p>{new Date(tour.date).toLocaleDateString()} | {tour.time}</p>
            </div>

            <div className="mb-4">
              <h5 className="fw-bold"><span role="img" aria-label="location">📍</span> Start Location</h5>
              <p>{tour.location}</p>
            </div>

            <div className="mb-4">
              <h5 className="fw-bold"><span role="img" aria-label="status">📘</span> Status</h5>
              <span className="badge bg-success">{tour.status || 'Scheduled'}</span>
            </div>

            <div className="mb-4">
              <h5 className="fw-bold"><span role="img" aria-label="description">📝</span> Description</h5>
              <p>{tour.description}</p>
            </div>

            <div className="mb-4">
              <h5 className="fw-bold"><span role="img" aria-label="activities">🎯</span> Included Activities</h5>
              <ul className="list-group list-group-flush">
                {/* {tour.activityNames && tour.activityNames.length > 0 ? (
                  tour.activityNames.map((activity, index) => (
                    <li className="list-group-item" key={index}>
                      Activity #{index + 1} – {activity}
                    </li>
                  ))
                ) : (
                  <li className="list-group-item text-muted">No activities listed</li>
                )} */}
                <li>Flower Fest</li>
                <li>Rose Tour</li>
              </ul>
            </div>

            <button
              onClick={() => window.history.back()}
              className="btn btn-primary mt-4"
            >
              ← Back to Tours
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;

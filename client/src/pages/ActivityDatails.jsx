import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MenuBar from '../components/MenuBar';

const ActivityDetails = () => {
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/About" },
    { label: "Profile", path: "/GuideProfile" },
    { label: "Dashboard", path: "/GuideDashboard" },
    { label: "Tour Center", path: "/TourCenter" },
  ];

  const { id } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const mockActivity = {
      name: 'Hiking in AlUla’s rock formations',
      activityID: 1,
      activityProvider: 'Safer',
      date: 'April 10, 2025',
      time: '9:00 AM',
      location: 'AlUla, Saudi Arabia',
      description: 'Explore AlUla’s scenic trails and rock formations on a guided desert hike.',
      imageUrl: '/alula2.jpg',
      state: 'Active',
    };
    setActivity(mockActivity);
  }, []);

  if (!activity) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="min-vh-100 bg-light">
      <MenuBar links={navLinks} />

      <div className="container d-flex justify-content-center py-5">
        <div className="card shadow-lg" style={{ maxWidth: '700px', width: '100%' }}>
          <div className="card-body text-center px-4 py-5">

            <h2 className="mb-4">
              <span role="img" aria-label="target">🎯</span> Activity Details
            </h2>

            <img
              src={activity.imageUrl}
              alt="Activity"
              className="img-fluid rounded mb-4 shadow-sm"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />

            <div className="mb-4">
              <h5 className="fw-bold"><span role="img" aria-label="pin">📌</span> Name</h5>
              <p>{activity.name}</p>
            </div>

            <div className="mb-4">
              <h5 className="fw-bold"><span role="img" aria-label="person">👤</span> Provider</h5>
              <p>{activity.activityProvider}</p>
            </div>

            <div className="mb-4">
              <h5 className="fw-bold"><span role="img" aria-label="calendar">📅</span> Date & Time</h5>
              <p>{activity.date} at {activity.time}</p>
            </div>

            <div className="mb-4">
              <h5 className="fw-bold"><span role="img" aria-label="location">📍</span> Location</h5>
              <p>{activity.location}</p>
            </div>

            <div className="mb-4">
              <h5 className="fw-bold"><span role="img" aria-label="status">📘</span> Status</h5>
              <span className="badge bg-success">{activity.state}</span>
            </div>

            <div className="mb-4">
              <h5 className="fw-bold"><span role="img" aria-label="note">📝</span> Description</h5>
              <p>{activity.description}</p>
            </div>

            <button
              onClick={() => window.history.back()}
              className="btn btn-primary"
            >
              ← Back to Tours
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetails;

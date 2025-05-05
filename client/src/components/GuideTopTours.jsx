// Path: src/components/GuideTopTours.jsx

import React, { useState, useEffect } from 'react';
import axios from '../api/axiosInstance'; // ✅ Import your axios instance	

const GuideTopTours = () => {
  const [topTours, setTopTours] = useState([]);

  useEffect(() => {
    const fetchTopTours = async () => {
      try {
        const guideId = localStorage.getItem('guideId');
        if (!guideId) return;

        // Fetch top 3 tours sorted by attendee count for this guide
        const response = await axios.get(`/guides/top-tours/${guideId}`);
        setTopTours(response.data);
      } catch (error) {
        console.error('Failed to fetch top attended tours:', error);
      }
    };

    fetchTopTours();
  }, []);

  if (!topTours.length) {
    return (
        <div className="d-flex flex-column gap-3">
          <div>No tours found for this guide.</div>
        </div>
      );
  }

  return (
    <div className="d-flex flex-column gap-3">
      {/* Loop through top 3 tours and render them dynamically */}
      {topTours.map((tour, index) => (
        <div
          key={index}
          className="rounded d-flex justify-content-around"
          style={{ backgroundColor: 'white', width: '25rem', paddingTop: '1.5rem' }}
        >
          <p>{tour.title}</p>
          <p>with {tour.attendees} attendees</p>
        </div>
      ))}
    </div>
  );
};

export default GuideTopTours;

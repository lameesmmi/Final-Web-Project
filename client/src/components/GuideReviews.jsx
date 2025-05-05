// Path: src/components/GuideReviews.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating';

const GuideReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const guideId = localStorage.getItem('guideId');

      if (!guideId) {
        console.warn('No guideId found in localStorage. Skipping review fetch.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/reviews/guide/${guideId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('❌ Failed to fetch guide reviews:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!reviews.length) return <div>No reviews found for this guide.</div>;

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '1rem',
        boxSizing: 'border-box',
        borderRadius: '0.5rem',
      }}
      className="shadow-sm"
    >
      {reviews.map((review, index) => (
        <div
          key={index}
          className="d-flex"
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '1rem',
            gap: '0.5rem',
          }}
        >
          <p style={{ margin: 0 }}>By: @{review.reviewer}</p>
          <StarRating rating={review.stars} />
        </div>
      ))}
    </div>
  );
};

export default GuideReviews;

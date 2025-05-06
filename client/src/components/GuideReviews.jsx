// Path: src/components/GuideReviews.jsx

import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';

const GuideReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate mock reviews with realistic usernames and random star ratings
    const generateMockReviews = () => {
      const sampleUsers = [
        'noura_94', 'fahad_travels', 'abdullah.s',
        'sara_ksa', 'majid.alt', 'reem.j', 'tourfan123'
      ];

      // Shuffle and take 3 random users
      const shuffledUsers = [...sampleUsers].sort(() => 0.5 - Math.random());
      const randomReviews = shuffledUsers.slice(0, 3).map((user) => ({
        reviewer: user,
        stars: Math.floor(Math.random() * 3) + 3 // 3 to 5 stars
      }));

      setReviews(randomReviews);
      setLoading(false);
    };

    generateMockReviews();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!reviews.length) return <div>No reviews found for this guide.</div>;

  return (
    <div className="d-flex flex-column gap-3">
      {/* Each review is shown in a separate card-like box */}
      {reviews.map((review, index) => (
        <div
          key={index}
          className="rounded shadow-sm d-flex justify-content-between align-items-center"
          style={{
            backgroundColor: 'white',
            padding: '1rem',
            width: '25rem'
          }}
        >
          <p style={{ margin: 0 }}>By: {review.reviewer}</p>
          <StarRating rating={review.stars} />
        </div>
      ))}
    </div>
  );
};

export default GuideReviews;

// Path: src/pages/GuideAccount.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GuideProfile.css';
import CardSlider from '../components/CardSlider';
import Activity from '../components/Activity';
import MenuBar from '../components/MenuBar';

const GuideAccount = () => {
  const navigate = useNavigate();
  const guideName = localStorage.getItem("loggedInGuideUsername");

  const [reviews, setReviews] = useState([]);
  const [guideData, setGuideData] = useState(null);

  const navLinks = [
    { label: 'Home', path: '/TourGuideHome' },
    { label: 'About', path: '/TourGuideAbout' },
    { label: 'Profile', path: '/GuideAccount' },
    { label: 'Dashboard', path: '/GuideDashboard' },
    { label: 'Tour Center', path: '/TourCenter' },
    { label: 'Logout', path: '/Home' },
  ];

  useEffect(() => {
    if (!guideName) {
      console.error("No logged-in guide username found.");
      navigate("/Login");
      return;
    }

    const fetchGuideData = async () => {
      try {
        const response = await fetch(`/guideProfile/${guideName}`);
        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Failed to fetch guide');

        const starsNumber = data.stars || 0;

        const formattedName = data.name || guideName
          .split('-')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');

        setGuideData({
          name: formattedName,
          email: data.contactEmail,
          phone: data.contactPhone,
          bio: data.bio,
          image: data.image,
          city: data.city,
          rating: starsNumber,
          stars: '⭐'.repeat(starsNumber),
          ratingCount: 6
        });

      } catch (err) {
        console.error('Error fetching guide data:', err);
      }
    };

    fetchGuideData();

    const staticReviews = [
      { title: "Great Experience", body: "The guide was knowledgeable and friendly.", name: "Sara Omar." },
      { title: "Loved it!", body: "Everything was perfectly organized.", name: "Omar Khalid." },
      { title: "Amazing!", body: "This tour exceeded my expectations.", name: "Layla Alghamdi." },
      { title: "Highly Recommend", body: "The guide shared so many cultural insights.", name: "Mohammed Fahad." },
      { title: "Wonderful Guide", body: "Warm and welcoming experience.", name: "Lama Abdullah." },
      { title: "Fantastic Trip", body: "Enjoyed every minute of it.", name: "Fahad Alanazi." }
    ];
    setReviews(staticReviews);
  }, [guideName, navigate]);

  if (!guideData) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <>
      <MenuBar links={navLinks} />

      <div className="guide-profile-page container">
        <h1 className="text-center mt-5" style={{ color: '#5c4033' }}>
          Welcome to {guideData.name}'s Profile!
        </h1>
        <p className="text-center">This page shows your full profile as a tour guide.</p>

        <h2 className="text-center fw-bold mt-5" style={{ color: '#5c4033' }}>
          Local Tour Guide in {guideData.city}
        </h2>

        <div className="d-flex align-items-start gap-4 mt-4 flex-wrap justify-content-center">
          <div className="d-flex flex-column align-items-center">
            <img src={guideData.image} alt={guideData.name} className="profile-img mb-3" />
            <div className="rating-box d-inline-block px-3 py-1 rounded-pill mb-2">
              <span>{guideData.rating}</span>
              <span className="ms-2">{guideData.stars}</span>
              <span className="ms-2 text-muted">({guideData.ratingCount})</span>
            </div>
          </div>

          <div className="bio-box-container" style={{ marginTop: '20px' }}>
            <label className="fw-bold d-block mb-1" style={{ color: 'var(--purpule-color)' }}>
              {guideData.name}
            </label>
            <div className="bio-box">{guideData.bio}</div>
          </div>

          <div className="contact-box-small" style={{ marginTop: '10px' }}>
            <p className="mb-1">Email: {guideData.email}</p>
            <p>Phone: {guideData.phone}</p>
          </div>
        </div>

        <div style={{ height: '100px' }}></div>

        {/* Custom Section: On Today's Tour */}
        <div>
          <h3 className="text-center fw-bold mb-3" style={{ color: '#5c4033' }}>
            On Today's Tour
          </h3>
          <div className="my-5">
            <CardSlider>
              <Activity customLink="/TourGuideViewActivity" />
              <Activity customLink="/TourGuideViewActivity" />
              <Activity customLink="/TourGuideViewActivity" />
              <Activity customLink="/TourGuideViewActivity" />
              <Activity customLink="/TourGuideViewActivity" />
            </CardSlider>
          </div>
        </div>

        {/* Traveler Reviews Section */}
        <div className="review-section mt-5">
          <h3 className="text-center fw-bold mb-3" style={{ color: '#5c4033' }}>
            Traveler Thoughts
          </h3>
          <p className="text-center">{guideData.stars} ({reviews.length})</p>

          <div className="review-grid">
            {reviews.map((review, index) => (
              <div
                key={index}
                style={{
                  border: '2px solid rgb(124, 121, 121)',
                  padding: '8px',
                  margin: '8px',
                  borderRadius: '8px',
                  width: '300px',
                  backgroundColor: '#fdfcf9'
                }}
              >
                <div style={{ fontSize: '20px', marginBottom: '8px' }}>⭐⭐⭐⭐⭐</div>
                <div style={{
                  width: '90%',
                  marginBottom: '4px',
                  padding: '6px',
                  backgroundColor: '#f0f0e9',
                  borderRadius: '4px'
                }}>{review.title}</div>
                <div style={{
                  width: '90%',
                  marginBottom: '4px',
                  padding: '6px',
                  backgroundColor: '#f0f0e9',
                  borderRadius: '4px'
                }}>{review.body}</div>
                <div style={{
                  width: '90%',
                  marginBottom: '4px',
                  padding: '6px',
                  backgroundColor: '#f0f0e9',
                  borderRadius: '4px'
                }}>{review.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GuideAccount;

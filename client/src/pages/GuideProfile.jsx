import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './GuideProfile.css';
import axios from '../api/axiosInstance'; 
import TouristMenuBar from "../components/TouristMenuBar";
import CardSlider from "../components/CardSlider";
import Activity from "../components/Activity";

const GuideProfile = () => {
  const [reviews, setReviews] = useState([]);
  const [guideData, setGuideData] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();
  const { guideName } = useParams();

  const formattedName = guideName
    ? guideName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : '';

  useEffect(() => {
    const fetchGuideData = async () => {
      try {
        const { data } = await axios.get(`/guideProfile/${guideName}`);
        setGuideData({
          name: formattedName,
          email: data.contactEmail,
          phone: data.contactPhone,
          bio: data.bio,
          image: data.image,
          city: data.city
        });
      } catch (err) {
        console.error("Error fetching guide data:", err);
      }
    };

    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(`/guideReviews/${guideName}`);
        setReviews(data);

        const total = data.reduce((sum, r) => sum + r.rating, 0);
        const avg = data.length ? Math.round(total / data.length) : 0;
        setAverageRating(avg);
      } catch (err) {
        console.error("Error fetching guide reviews:", err);
      }
    };

    const fetchActivities = async () => {
      try {
        const { data } = await axios.get(`/activities`);
        setActivities(data);
      } catch (err) {
        console.error("Error fetching activities:", err);
      }
    };

    fetchGuideData();
    fetchReviews();
    fetchActivities();
  }, [guideName]);

  if (!guideData) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <>
      <TouristMenuBar />

      <div className="guide-profile-page container">
        <h1 className="text-center mt-5" style={{ color: '#5c4033' }}>
          Welcome to {guideData.name}'s Profile!
        </h1>
        <p className="text-center">This page can show full details about this tour guide.</p>

        <h2 className="text-center fw-bold mt-5" style={{ color: '#5c4033' }}>
          Local Tour Guide in {guideData.city}
        </h2>

        <div className="d-flex align-items-start gap-4 mt-4 flex-wrap justify-content-center">
          <div className="d-flex flex-column align-items-center">
            <img
              src={guideData.image}
              alt={guideData.name}
              className="profile-img mb-3"
            />
            <div className="rating-box d-inline-block px-3 py-1 rounded-pill mb-2">
              <span>{averageRating}</span>
              <span className="ms-2">{'⭐'.repeat(averageRating)}</span>
              <span className="ms-2 text-muted">({reviews.length})</span>
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

        <div className="customize-box text-center py-4">
          <h4 className="fw-bold mb-2" style={{ color: 'var(--purpule-color)' }}>
            Customize Your Tour
          </h4>
          <p
            className="text-muted"
            style={{ textDecoration: 'underline', cursor: 'pointer', color: '#5c4033' }}
            onClick={() => navigate('/ContactTourGuide', { state: { guideName: guideData.name } })}
          >
            Contact your tour guide to know more!
          </p>
        </div>

        <div className="my-5">
          <CardSlider>
            {activities.map((activity) => (
              <Activity key={activity._id} activity={activity} customLink={`/ViewActivity/${activity._id}`} />
            ))}
          </CardSlider>
        </div>

        <div className="review-section mt-5">
          <h3 className="text-center fw-bold mb-3" style={{ color: '#5c4033' }}>
            Traveler Thoughts
          </h3>
          <p className="text-center">{'⭐'.repeat(averageRating)} ({reviews.length})</p>

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
                <div style={{ fontSize: '20px', marginBottom: '8px' }}>{'⭐'.repeat(review.rating)}</div>
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
                  borderRadius: '4px',
                  fontWeight: '500',
                  fontSize: '14px',
                  textAlign: 'left'
                }}>{review.touristUsername}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GuideProfile;

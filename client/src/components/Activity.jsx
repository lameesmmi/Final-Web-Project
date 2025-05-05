import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';

function Activity({ activity, customLink, onUnlike }) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  const touristId = localStorage.getItem('touristId');

  // Check if this activity is already in the user's wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!touristId || !activity?._id) return;
      try {
        const res = await axios.get(`/tourists/${touristId}/wishlist`);
        const alreadyLiked = res.data.some(item => item._id === activity._id);
        setIsLiked(alreadyLiked);
      } catch (err) {
        console.error("❌ Failed to fetch wishlist:", err);
      }
    };

    fetchWishlist();
  }, [touristId, activity]);

  const toggleLike = async () => {
    if (!touristId || !activity?._id) return;

    try {
      if (!isLiked) {
        await axios.post(`/tourists/${touristId}/wishlist`, { activityId: activity._id });
        setIsLiked(true);
      } else {
        await axios.delete(`/tourists/${touristId}/wishlist/${activity._id}`);
        setIsLiked(false);
        if (typeof onUnlike === 'function') {
          onUnlike(activity._id); // Inform parent to remove from UI
        }
      }
    } catch (err) {
      console.error("❌ Wishlist update failed:", err);
    }
  };

  const handleClick = () => {
    if (customLink) {
      navigate(customLink);
    } else {
      navigate(`/ActivityDetails/${activity._id}`);
    }
  };

  if (!activity) return <div>Loading...</div>;

  return (
    <div
      className="card"
      style={{
        width: '12rem',
        height: '20rem', // Fixed height
        margin: '10px',
        borderColor: 'var(--green-color)',
        borderWidth: '3px',
        padding: '5px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >

      <button
        onClick={toggleLike}
        className="btn p-0"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          color: isLiked ? 'red' : 'gray'
        }}
        aria-label="Add to wishlist"
      >
        <i className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}`}></i>
      </button>

      <img
        src={activity.image}
        className="card-img-top"
        alt="Event"
        style={{ height: '45%', marginBottom: '5px' }}
      />
      <div className="card-body" style={{ padding: '3px' }}>
        <h5 className="card-title">{activity.eventName}</h5>
        <p className="card-subtitle text-body-secondary" style={{ margin: '5px', fontSize: '15px' }}>By: {activity.provider.companyName}</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            type="button"
            id="evnt-details-button"
            className="btn guide-button"
            onClick={handleClick}
            style={{ margin: '10px', padding: '7px' }}
          >
            More details
          </button>
        </div>
      </div>
    </div>
  );
}

export default Activity;

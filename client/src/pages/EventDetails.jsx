import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/EventDetails.css';
import Navbar from '../components/Navbar';

const events = [
  {
    id: 1,
    name: 'Camel riding',
    rating: 4,
    image: '/camles-riding.jpg',
    reviews: [
      {
        id: 1,
        title: 'Amazing Experience!',
        body: 'It was unforgettable. Loved every second of it!',
        reviewer: 'Sarah',
        date: 'April 15, 2025'
      }
    ]
  },
  {
    id: 2,
    name: 'Hiking',
    rating: 5,
    image: '/hiking in desert.jpg',
    reviews: [
      {
        id: 2,
        title: 'Highly recommended',
        body: 'Very organized and beautiful views.',
        reviewer: 'Mohammed',
        date: 'April 12, 2025'
      }
    ]
  },
  {
    id: 3,
    name: 'Buggy rides',
    rating: 4.5,
    image: '/buggy rides.jpg',
    reviews: [
      {
        id: 3,
        title: 'Wonderful',
        body: 'Loved the guide and the vibe.',
        reviewer: 'Leena',
        date: 'April 10, 2025'
      }
    ]
  },
  {
    id: 4,
    name: 'Camping under stars',
    rating: 5,
    image: '/camping under stars.jpg',
    reviews: []
  }
];

const EventDetails = () => {
  const { eventId } = useParams();
  const event = events.find(e => e.id === parseInt(eventId));

  if (!event) {
    return <p style={{ padding: '2rem' }}>❌ Event not found</p>;
  }

  return (
    <>
      <Navbar />
      <div className="event-details-page">
        <div className="event-header">
          <h1 className="event-title">{event.name}</h1>
          <div className="event-rating">⭐ {event.rating}</div>
        </div>

        <div className="review-grid">
          {event.reviews.length > 0 ? (
            event.reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-title">{review.title}</div>
                <div className="review-body">{review.body}</div>
                <div className="reviewer-info">
                  <span className="reviewer-icon">👤</span>
                  <span>{review.reviewer}</span> | <span>{review.date}</span>
                </div>
              </div>
            ))
          ) : (
            <p style={{ fontStyle: 'italic', color: '#555' }}>No reviews yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default EventDetails;

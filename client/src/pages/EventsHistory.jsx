import React from 'react';
import '../styles/EventsHistory.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const events = [
  { id: 1, name: 'Camel riding', rating: 4, image: '/camles-riding.jpg' },
  { id: 2, name: 'Hiking', rating: 5, image: '/hiking in desert.jpg' },
  { id: 3, name: 'Buggy rides', rating: 4.5, image: '/buggy rides.jpg' },
  { id: 4, name: 'Camping under stars', rating: 5, image: '/camping under stars.jpg' },
];

const EventsHistory = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="events-history-page">
        <h1 className="page-title">Events history reviews</h1>
        <div className="events-grid">
          {events.map((event) => (
            <div
              key={event.id}
              className="event-card"
              onClick={() => navigate(`/events-history/${event.id}`)}
            >
              <div className="event-image">
                <img src={event.image} alt={event.name} />
                <div className="event-overlay">
                  <div className="event-header">
                    <h3>{event.name}</h3>
                    <div className="event-rating">
                      <span className="star">⭐</span>
                      <span>{event.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventsHistory;

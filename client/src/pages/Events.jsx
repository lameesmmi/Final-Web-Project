import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuBar from '../components/MenuBar';
import ContactInfo from '../components/ContactInfo';
import axios from '../api/axiosInstance';

const links = [
  { path: "/Events", label: "Home" },
  { path: "/profile", label: "Profile" },
  { path: "/Reservations", label: "Reservations" },
  { path: "/EventsHistory", label: "Events History" },
  { path: "/Home", label: "Logout" },
];

const Events = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoverCreateCard, setHoverCreateCard] = useState(false);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data } = await axios.get('/activities');
        setActivities(data);
      } catch (err) {
        console.error('Failed to fetch activities:', err);
      }
    };

    fetchActivities();
  }, []);

  const handleActivityClick = (activityId) => {
    navigate(`/EventDetails/${activityId}`);
  };

  const handleCreateEventClick = () => {
    navigate('/create-event');
  };

  const baseCardStyle = {
    backgroundColor: '#9abf80',
    padding: '25px',
    textAlign: 'center',
    borderRadius: '40px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    color: '#584335',
    transition: 'transform 0.2s, box-shadow 0.2s'
  };

  const getCardStyle = (index) => ({
    ...baseCardStyle,
    ...(hoveredCard === index && {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    })
  });

  const getCreateCardStyle = () => ({
    ...baseCardStyle,
    fontSize: '21px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    ...(hoverCreateCard && {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    })
  });

  return (
    <>
      <MenuBar links={links} />
      <header style={{ padding: '30px 20px', marginBottom: '30px', textAlign: 'left' }}>
        <h1>Joyful Journeys</h1>
        <p>Joyful Journeys is your ultimate destination for unforgettable experiences...</p>
      </header>

      <main style={{ margin: '50px 0', padding: '20px', backgroundColor: 'white' }}>
        <h2>Upcoming Events</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '50px',
          margin: '60px'
        }}>
          <div
            style={getCreateCardStyle()}
            onClick={handleCreateEventClick}
            onMouseEnter={() => setHoverCreateCard(true)}
            onMouseLeave={() => setHoverCreateCard(false)}
          >
            <h3>Create a New Event</h3>
          </div>

          {activities.map((activity, index) => (
            <div
              key={activity._id}
              style={getCardStyle(index)}
              onClick={() => handleActivityClick(activity._id)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h3>{activity.eventName}</h3>
              <p>Remaining seats: {activity.remainingSeats}</p>
              <p>Time: {activity.time}</p>
            </div>
          ))}
        </div>
      </main>

      <footer>
        <ContactInfo />
      </footer>
    </>
  );
};

export default Events;

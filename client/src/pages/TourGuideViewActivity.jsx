import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MenuBar from '../components/MenuBar';


const TourGuideViewActivity = () => {
    const navLinks = [
        
    { label: "Home", path: "/TourGuideHome" },
    { label: "About", path: "/TourGuideAbout" },
    { label: "Profile", path: "/GuideAccount" },
    { label: "Dashboard", path: "/GuideDashboard" },
    { label: "Tour Center", path: "/TourCenter" },
    { label: "Logout", path: "/Home" },
    ];

    const { id } = useParams();
    const [activity, setActivity] = useState(null);
    const [seats, setSeats] = useState(1);

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
            state: 'Open',
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

                        <div className="mb-4">
                            <h5 className="fw-bold">🎟️ Number of Seats</h5>
                            <div className="d-flex justify-content-center align-items-center gap-2">
                                <button className="btn btn-outline-secondary" onClick={() => setSeats(Math.max(1, seats - 1))}>-</button>
                                <span>{seats}</span>
                                <button className="btn btn-outline-secondary" onClick={() => setSeats(seats + 1)}>+</button>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center gap-3">
                            <button
                                onClick={() => window.history.back()}
                                className="btn"
                                style={{ backgroundColor: '#9abf80', color: 'white', border: 'none' }}
                            >
                                ← Continue Exploring Activities
                            </button>

                            <button
                                className="btn"
                                style={{ backgroundColor: '#9abf80', color: 'white', border: 'none' }}
                            >
                                ➕ Add to Plan
                            </button>

                            <button
                                className="btn"
                                style={{ backgroundColor: '#9abf80', color: 'white', border: 'none' }}
                            >
                                ❤️
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourGuideViewActivity;
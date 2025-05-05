import React, { useState, useEffect } from 'react';

const AdminTopActivities = () => {
  const [topActivities, setTopActivities] = useState([]);

  // Simulated data fetch (replace with real API call later)
  useEffect(() => {
    const mockActivities = [
      { name: 'Hiking in AlUla', attendees: 45 },
      { name: 'Desert Safari Riyadh', attendees: 32 },
      { name: 'Cultural Tour Jeddah', attendees: 27 },
    ];

    setTopActivities(mockActivities);
  }, []);

  if (!topActivities.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex flex-column gap-3">
      {topActivities.map((activity, index) => (
        <div
        key={index}
        className="rounded border p-3 mb-3 d-flex justify-content-between bg-white"
        style={{
            width: '100%',
            maxWidth: '25rem',
        }}
        >
        <p className="mb-0">{activity.name}</p>
        <p className="mb-0">with {activity.attendees} attendees</p>
        </div>
      ))}
    </div>
  );
};

export default AdminTopActivities;

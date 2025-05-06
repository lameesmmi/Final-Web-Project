// Path: src/components/GuideTopTours.jsx

import React, { useState, useEffect } from 'react';

const GuideTopTours = () => {
  // State to hold top 3 tours from one region
  const [topTours, setTopTours] = useState([]);

  useEffect(() => {
    // Region-based tour pools
    const regions = {
      Riyadh: [
        "Edge Hike",
        "Desert Safari",
        "Diriyah Walk",
        "Wadi Cycling",
        "Skyview Tour"
      ],
      AlAhsa: [
        "Oasis Tour",
        "Date Farm",
        "Qara Hike",
        "Souq Walk",
        "Springs Trip"
      ],
      AlUla: [
        "Stargazing",
        "Rock Safari",
        "Hegra Trek",
        "Old Town",
        "Desert Trail"
      ],
      Jeddah: [
        "Coastal Cruise",
        "Red Sea Dive",
        "Balad Walk",
        "Food Tour",
        "Mosque Visit"
      ],
      Taif: [
        "Flower Fest",
        "Shafa Picnic",
        "Rose Tour",
        "Cable Ride",
        "Fruit Market"
      ],
      Abha: [
        "Heritage Walk",
        "Soudah Trek",
        "Art Street",
        "Village Tour",
        "Cloud View"
      ]
    };
    

    // Choose a random region
    const regionKeys = Object.keys(regions);
    const selectedRegion = regionKeys[Math.floor(Math.random() * regionKeys.length)];
    const regionTours = regions[selectedRegion];

    // Shuffle and pick 3 tours from that region
    const shuffled = [...regionTours].sort(() => 0.5 - Math.random());
    const selectedTours = shuffled.slice(0, 3).map((title) => ({
      title,
      attendees: Math.floor(Math.random() * 20) + 20 // Range: 20–39
    }));

    setTopTours(selectedTours);
  }, []);

  if (!topTours.length) {
    return (
      <div className="d-flex flex-column gap-3">
        <div>No tours found for this guide.</div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3">
      {/* Render 3 tours from the same region */}
      {topTours.map((tour, index) => (
        <div
          key={index}
          className="rounded d-flex justify-content-around"
          style={{
            backgroundColor: 'white',
            width: '25rem',
            paddingTop: '1.5rem'
          }}
        >
          <p>{tour.title}</p>
          <p>with {tour.attendees} attendees</p>
        </div>
      ))}
    </div>
  );
};

export default GuideTopTours;

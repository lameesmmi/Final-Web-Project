import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance'; // ✅ Import your axios instance
import Tour from './Tour';
import CardSlider from './CardSlider';

const GuideTourSlider = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const guideId = localStorage.getItem('guideId'); // ✅ Get guide ID from storage
        if (!guideId) return;

          const res = await axios.get(`/tours/guide/id/${guideId}`);

        setTours(res.data);
      } catch (err) {
        console.error('Failed to fetch tours for guide:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) return <div>Loading tours...</div>;
  if (!tours.length) return <div>No tours to display.</div>;

  return (
    <CardSlider>
      {Array.isArray(tours) && tours.map((tour, index) => (
        <Tour key={index} tour={tour} />
      ))}
    </CardSlider>
  );
};

export default GuideTourSlider;


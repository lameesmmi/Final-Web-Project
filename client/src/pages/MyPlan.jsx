import React, { useEffect, useState } from 'react';
import MyPlanTable from '../components/MyPlanTable';
import TouristMenuBar from '../components/TouristMenuBar';
import axios from '../api/axiosInstance';

const MyPlan = () => {
  const [activities, setActivities] = useState([]);
  const touristId = localStorage.getItem('touristId'); 

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await axios.get(`/tourists/${touristId}/myplan`);
        setActivities(res.data);
      } catch (err) {
        console.error("Failed to fetch plan:", err);
      }
    };

    if (touristId) {
      fetchPlan();
    }
  }, [touristId]);

  return (
    <div>
      <TouristMenuBar />
      <div className="container mt-5 text-center">
        <h2>My Plan</h2>
        <MyPlanTable activities={activities} setActivities={setActivities} />
      </div>
    </div>
  );
};

export default MyPlan;

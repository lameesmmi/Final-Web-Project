import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';
import CardSlider from "../components/CardSlider";
import Activity from "../components/Activity";
import DropdownMenu from "../components/DropdownMenu";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TouristMenuBar from '../components/TouristMenuBar';

const ExploreActivities = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city, date } = location.state || {};
  const [selectedDate, setSelectedDate] = useState(date || null);
  const [activities, setActivities] = useState([]);
  const [destination, setDestination] = useState(city || "");
  const [description, setDescription] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!city) return;

    const fetchCityData = async () => {
      try {
        const res = await fetch(`/cities/${city}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch city");
        }

        setDestination(data.name);
        setDescription(data.bio);
      } catch (err) {
        console.error("Fetch error:", err);
        setDestination(city);
        setDescription("Discover unique experiences and activities in this city.");
      }
    };

    fetchCityData();
  }, [city]);

  useEffect(() => {
    if (!city || !selectedDate) {
      console.log("❌ Missing city or selectedDate", { city, selectedDate });
      return;
    }

    console.log("📦 Fetching with:", { city, date: selectedDate });

    const fetchActivities = async () => {
      try {
        const res = await axios.get('/activities', {
          params: {
            city,
            date: selectedDate
          }
        });
        console.log("✅ Activities fetched:", res.data);
        setActivities(res.data);
      } catch (err) {
        console.error("❌ Error fetching activities:", err);
      }
    };

    fetchActivities();
  }, [city, selectedDate]);

  return (
    <div className="explore-activities-page">
      <TouristMenuBar />

      <h2 className="text-center fw-bold mt-4" style={{ color: '#584335' }}>
        Explore Activities!
      </h2>

      {/* Hero Banner */}
      <div
        className="hero-banner my-4"
        style={{
          backgroundColor: "#eee",
          padding: "40px",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        <h1 className="fw-bold" style={{ color: '#584335' }}>{destination}</h1>
        <p className="text-muted">{description}</p>
      </div>

      {/* Filters Row */}
      <div className="d-flex justify-content-between px-4 mb-3 align-items-center flex-wrap gap-3">
        <div style={{ width: "fit-content" }}>
          <DropdownMenu onSelectCity={(selected) => navigate("/ExploreActivities", { state: { city: selected, date: selectedDate } })} />
        </div>

        <div style={{ width: "fit-content" }}>
          <label className="d-block mb-1" style={{ fontSize: '14px', color: '#5c4033', textAlign: 'left' }}>
            Find your perfect day!
          </label>
          <div className="position-relative">
            <DatePicker
              selected={selectedDate ? new Date(selectedDate) : null}
              onChange={(date) => setSelectedDate(date.toLocaleDateString('en-CA'))}
              placeholderText="mm/dd/yyyy"
              className="form-control pe-4"
            />
            <span
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                fontSize: "16px",
                color: "#6c757d",
                pointerEvents: "none"
              }}
            >
              📅
            </span>
          </div>
        </div>
      </div>

      {/* Activity Cards */}
      <div className="px-4 pb-5">
        {activities.length === 0 ? (
          <p className="text-center">No activities found for this day.</p>
        ) : (
          <CardSlider>
            {activities.map((activity) => (
              <Activity key={activity._id} activity={activity} customLink={`/ViewActivity/${activity._id}`} />
            ))}
          </CardSlider>
        )}
      </div>
    </div>
  );
};

export default ExploreActivities;

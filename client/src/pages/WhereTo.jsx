//WhereTo

import React, { useState } from 'react';
import DropdownMenu from '../components/DropdownMenu';
import CalendarComponent from '../components/CalendarComponent';
import './WhereTo.css';
import TouristMenuBar from '../components/TouristMenuBar';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const formatDateLocal = (dateObj) => {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


function WhereTo() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleExploreClick = () => {
    const cityInput = document.querySelector(".dropdown-container input");
    const cityValue = cityInput ? cityInput.value.trim() : "";
  
    if (!cityValue || !selectedDate) {
      setShowError(true);
      return;
    }
  
    const formattedDate = selectedDate instanceof Date
      ? selectedDate.toLocaleDateString('en-CA') // ✅ "YYYY-MM-DD" in local time
      : selectedDate;
  
    navigate("/ExploreActivities", {
      state: {
        city: cityValue,
        date: formattedDate
      }
    });
  };
  
  

  return (
    <div className="experience-page">
      <TouristMenuBar />

      <div
        className="hero-section"
        style={{
          backgroundImage: "url('/Alula-Image.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '250px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1 className="hero-heading">Plan Your Experience!</h1>
      </div>

      <div className="form-section">
        <div className="dropdown-container">
          <DropdownMenu onSelectCity={(city) => setSelectedCity(city)} />
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', paddingRight: '60px' }}>
          <div
            style={{
              backgroundColor: '#e5e3d4',
              borderRadius: '20px',
              padding: '16px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transform: 'scale(0.9)',
              transformOrigin: 'top right',
              width: '400px',
              marginTop: '-100px',
            }}
          >
            <p className="calendar-label" style={{ textAlign: 'center', marginBottom: '10px' }}>
              Choose a day for your activity!
            </p>
            <CalendarComponent onDateChange={(date) => setSelectedDate(date)} />
          </div>
        </div>
      </div>

      <div className="button-wrapper" style={{ marginTop: '-60px' }}>
        <button className="explore-btn" onClick={handleExploreClick}>Explore Activities</button>
      </div>

      {showError && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <Alert
            variant="danger"
            className="text-center"
            style={{ width: "400px", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}
          >
            <div className="fw-bold mb-3">Please select a city before continuing.</div>
            <button
              className="btn btn-outline-danger"
              onClick={() => setShowError(false)}
            >
              OK
            </button>
          </Alert>
        </div>
      )}
    </div>
  );
} 

export default WhereTo;

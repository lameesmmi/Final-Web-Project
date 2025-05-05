// Path: src/components/TourStatistics.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TourStatistics.css";


const guideId = localStorage.getItem('guideId');

const TourStatistics = () => {
  // Selected date range
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Statistics returned from the backend
  const [stats, setStats] = useState({
    completed: 0,
    canceled: 0,
    scheduled: 0,
    attendees: 0
  });

  // Fetch stats from the backend when the date range changes
  useEffect(() => {
    if (fromDate && toDate) {
      axios
        .get(`/guides/tour-stats/${guideId}?from=${fromDate}&to=${toDate}`)
        .then((res) => setStats(res.data))
        .catch((err) => console.error("Error fetching statistics:", err));
    }
  }, [fromDate, toDate]);

  return (
    <div className="tour-statistics">
      {/* Date range input fields */}
      <div className="date-range">
        <div className="date-field">
          <label htmlFor="fromDate">From</label>
          <input
            id="fromDate"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            max={toDate || undefined} // Prevent invalid ranges
          />
        </div>

        <div className="date-field">
          <label htmlFor="toDate">To</label>
          <input
            id="toDate"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            min={fromDate || undefined}
          />
        </div>
      </div>

      {/* Dynamic statistics display */}
      <div className="stats-box">
        <div className="stat-row">
          <span>Total tours completed</span>
          <span className="stat-number">{stats.completed}</span>
        </div>
        <div className="stat-row">
          <span>Tours canceled</span>
          <span className="stat-number">{stats.canceled}</span>
        </div>
        <div className="stat-row">
          <span>Tours scheduled</span>
          <span className="stat-number">{stats.scheduled}</span>
        </div>
        <div className="stat-row">
          <span>Total attendees</span>
          <span className="stat-number">{stats.attendees}</span>
        </div>
      </div>
    </div>
  );
};

export default TourStatistics;


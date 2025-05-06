// Path: src/components/TourStatistics.jsx

import React, { useState, useEffect } from "react";
import "./TourStatistics.css";

// Simulated guide ID usage (kept for structure consistency, though unused now)
const guideId = localStorage.getItem('guideId');

const TourStatistics = () => {
  // Selected date range
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Statistics state
  const [stats, setStats] = useState({
    completed: 0,
    canceled: 0,
    scheduled: 0,
    attendees: 0
  });

  // Simulate fetching data each time the date range changes
  useEffect(() => {
    if (fromDate && toDate) {
      // Optional delay to simulate an API call
      const timeout = setTimeout(() => {
        const scheduled = Math.floor(Math.random() * 10) + 5; // 5–14 scheduled
        const completed = Math.floor(Math.random() * (scheduled + 1)); // 0–scheduled
        const canceled = Math.floor(Math.random() * (scheduled - completed + 1)); // 0–remaining
        const attendees = completed * (Math.floor(Math.random() * 4) + 2); // 2–5 attendees per tour

        setStats({
          completed,
          canceled,
          scheduled,
          attendees
        });
      }, 500); // Simulated response delay

      return () => clearTimeout(timeout); // Cleanup if range changes quickly
    }
  }, [fromDate, toDate]);

  return (
    <div className="tour-statistics">
      {/* Date range inputs */}
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

      {/* Statistics display */}
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

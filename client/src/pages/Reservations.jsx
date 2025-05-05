// Path: src/pages/Reservations.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Reservation.css';
import axios from '../api/axiosInstance';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [confirmed, setConfirmed] = useState([]);
  const [reminded, setReminded] = useState([]);

  // ✅ Fetch reservations from MongoDB
  useEffect(() => {
    axios.get('/reservations')
      .then((res) => {
        setReservations(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch reservations:', err);
      });
  }, []);

  const handleConfirm = (index) => {
    if (!confirmed.includes(index)) {
      setConfirmed([...confirmed, index]);
      alert(`Reservation #${index + 1} has been confirmed`);
    }
  };

  const handleReminder = (index) => {
    if (!reminded.includes(index)) {
      setReminded([...reminded, index]);
      alert(`Reminder sent for reservation #${index + 1}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">Events Reservation Status</h1>
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center">
            <thead>
              <tr>
                <th>Res #</th>
                <th>Event</th>
                <th>Participant</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res, index) => (
                <tr key={index}>
                  <td>#{index + 1}</td>
                  <td>{res.event}</td>
                  <td>{res.participant}</td>
                  <td>
                    <span className={`custom-badge ${res.status.toLowerCase() === 'paid' ? 'status-confirmed' : 'status-cancelled'}`}>
                      {res.status.toLowerCase()}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`icon-btn ${reminded.includes(index) ? 'pressed' : ''}`}
                      onClick={() => handleReminder(index)}
                    >
                      🔔
                    </button>
                    <button
                      className={`icon-btn ${confirmed.includes(index) ? 'pressed' : ''}`}
                      onClick={() => handleConfirm(index)}
                    >
                      ✅
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Reservations;

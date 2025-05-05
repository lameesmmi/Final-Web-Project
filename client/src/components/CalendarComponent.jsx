import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarComponent.css';

function CalendarComponent({ onDateChange }) {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    if (onDateChange) {
      onDateChange(newDate.toLocaleDateString('en-CA')); // ✅ fixed timezone bug
    }
  };

  return (
    <div className="calendar-container">
      <div style={{ transform: 'scale(0.85)', transformOrigin: 'top center' }}>
        <Calendar onChange={handleDateChange} value={date} />
      </div>
      <p className="mt-3">Selected date: {date.toDateString()}</p>
    </div>
  );
}

export default CalendarComponent;

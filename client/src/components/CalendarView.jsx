// Path: src/components/CalendarView.jsx

import React, { useState } from 'react';
import './CalendarView.css';
import Calendar from 'react-calendar'; // Calendar library
import 'react-datepicker/dist/react-datepicker.css'; // Datepicker styles (if needed elsewhere)
import 'react-calendar/dist/Calendar.css'; // Calendar styles

const CalendarView = () => {
  // State to store the selected month from dropdown
  const [selectedMonth, setSelectedMonth] = useState('');
  // State to store the starting date (for delete range)
  const [startDate, setStartDate] = useState('');
  // State to store the ending date (for delete range)
  const [endDate, setEndDate] = useState('');
  // State to control the displayed month/year on the calendar
  const [calendarDate, setCalendarDate] = useState(new Date());

  // Function to handle deletion of tours between selected dates
  const handleDelete = () => {
    alert(`Deleting tours from ${startDate} to ${endDate}`);
  };

  return (
    <div className="calendar-container">
      
      {/* Dropdown for month selection */}
      <select
        className="calendar-month-dropdown"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        <option value="">Choose a month</option>
        {/* Month options */}
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>

      {/* Horizontal layout for calendar + filters */}
      <div className="calendar-content-row">

        {/* Interactive calendar */}
        <div className="calendar-box">
          <Calendar
            onChange={setCalendarDate} // Update displayed date
            value={calendarDate}        // Controlled component
            className="custom-calendar"
            calendarType="gregory"       // Use Gregorian calendar
            view="month"                 // Show only months (no years/weeks)
            minDetail="month"             // Prevent zooming out beyond month view
            showNavigation={true}         // Allow navigating months
            showNeighboringMonth={false}  // Hide days from previous/next months
          />
        </div>

        {/* Date range selection and delete button */}
        <div className="calendar-filters">
          <label>
            From
            <input
              type="date"
              className="calendar-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)} // Set "From" date
              max={endDate || undefined}                    // Prevent selecting after "To" date
            />
          </label>

          <label>
            To
            <input
              type="date"
              className="calendar-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}  // Set "To" date
              min={startDate || undefined}                  // Prevent selecting before "From" date
            />
          </label>

          {/* Button to trigger delete action */}
          <button
            className="calendar-delete-btn"
            onClick={handleDelete}
            disabled={!startDate || !endDate} // Disable button if dates are not filled
          >
            Delete Tour/s
          </button>

        </div>
      </div>
    </div>
  );
};

export default CalendarView;

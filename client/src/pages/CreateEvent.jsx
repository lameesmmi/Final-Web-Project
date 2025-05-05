// // Importing necessary components, libraries, pages 

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuBar from '../components/MenuBar';
import ContactInfo from '../components/ContactInfo';
import Popup from '../components/Popup'; // Importing the Popup component

const links = [
  { path: "/Events", label: "Home" },
  { path: "/profile", label: "Profile" },
  { path: "/Reservations", label: "Reservations" },
  { path: "/EventsHistory", label: "Events History" },
  { path: "/Home", label: "Logout" },
];

const CreateEvent = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    description: '',
    region: '',
    capacity: '',
    venue: '',
    time: '',
    price: '',
    date: '',
  });
  const [popup, setPopup] = useState(null);
  const [hover, setHover] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { description, region, venue, capacity, time, price, date } = eventData;

    if (!description || !region || !venue || !capacity || !time || !price || !date) {
      setPopup({
        type: 'danger',
        title: 'Error',
        message: 'All fields are required!',
        onConfirm: () => setPopup(null)
      });
      return;
    }

    if (parseInt(capacity) <= 0 || parseInt(price) <= 0) {
      setPopup({
        type: 'danger',
        title: 'Invalid Input',
        message: 'Capacity and Price must be positive numbers.',
        onConfirm: () => setPopup(null)
      });
      return;
    }

    console.log('Event created:', eventData);
    setPopup({
      type: 'success',
      title: 'Success',
      message: 'Event created successfully!',
      onConfirm: () => navigate('/Events')
    });
  };

  const createEventStyle = {
    backgroundColor: '#9abf80',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: 'auto',
    color: '#584335',
    position: 'relative',
    zIndex: 1
  };

  const h2Style = {
    textAlign: 'center',
    marginBottom: '20px',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const labelStyle = {
    marginBottom: '15px',
  };

  const inputStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '95%',
  };

  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '40px',
    cursor: 'pointer',
    backgroundColor: hover ? '#e5e3d4' : '#584335',
    color: hover ? '#584335' : 'white',
    transition: 'background-color 0.3s',
    alignSelf: 'center',
    width: '150px',
  };

  const pageStyle = {
    backgroundColor: 'white',
    minHeight: '100vh',
    position: 'relative'
  };

  return (
    <>
      <MenuBar links={links} />

      <header style={{ padding: '30px 20px', marginBottom: '30px' }} className="header-background">
        <h1>Joyful Journeys</h1>
        <p>
          Joyful Journeys is your ultimate destination for unforgettable experiences and vibrant adventures. We specialize in curating unique activities that bring joy, excitement, and connection to individuals, families, and groups. From outdoor escapades to creative workshops, our mission is to inspire and energize people of all ages to explore new horizons and embrace the thrill of the journey!!
        </p>
      </header>

      <div style={pageStyle}>
        <main className="App container" style={{ backgroundColor: 'white', padding: '20px' }}>
          <div style={createEventStyle}>
            <h2 style={h2Style}>Create an Event</h2>
            <form style={formStyle} onSubmit={handleSubmit}>
              {["description", "region", "capacity", "venue", "time", "price", "date"].map((field) => (
                <label key={field} style={labelStyle}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                  <input
                    type={field === "date" ? "date" : field === "capacity" || field === "price" ? "number" : "text"}
                    name={field}
                    placeholder={field === "time" ? "e.g., 10:00 AM" : ""}
                    value={eventData[field]}
                    onChange={handleChange}
                    style={inputStyle}
                    min={field === "capacity" || field === "price" ? 1 : undefined}
                  />
                </label>
              ))}
              <button
                type="submit"
                style={buttonStyle}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                Create
              </button>
            </form>
          </div>
        </main>
        {popup && (
          <div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw', backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 999 }}>
            <Popup
              title={popup.title}
              message={popup.message}
              type={popup.type}
              showConfirm={true}
              onConfirm={popup.onConfirm}
            />
          </div>
        )}
      </div>

      <footer>
        <ContactInfo />
      </footer>
    </>
  );
};

export default CreateEvent;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MenuBar from '../components/MenuBar';
import ContactInfo from '../components/ContactInfo';
import axios from '../api/axiosInstance';

const links = [
  { path: "/Events", label: "Home" },
  { path: "/profile", label: "Profile" },
  { path: "/Reservations", label: "Reservations" },
  { path: "/EventsHistory", label: "Events History" },
  { path: "/Home", label: "Logout" },
];

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activityData, setActivityData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const { data } = await axios.get(`/activities/${id}`);
        setActivityData(data);
      } catch (err) {
        console.error("Failed to load activity:", err);
        setActivityData(null);
      }
    };
    fetchActivity();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!activityData) return;

    setActivityData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    if (!activityData) return;

    if (isEditing) {
      const errors = {};
      ["description", "region", "venue", "date", "time", "capacity", "price"].forEach(field => {
        const value = activityData[field];
        if (!value || value.toString().trim() === "") {
          errors[field] = "Field cannot be empty";
        } else if ((field === "capacity" || field === "price") && value < 1) {
          errors[field] = "Must be a positive number";
        }
      });

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }

      setShowSavePopup(true);
    } else {
      setIsEditing(true);
    }
  };

  const handleSaveConfirm = async () => {
    try {
      await axios.put(`/activities/${id}`, activityData);
      setIsEditing(false);
      setShowSavePopup(false);
      setValidationErrors({});
    } catch (err) {
      alert("Update failed.");
      console.error(err);
    }
  };

  const handleCancelClick = () => setShowCancelPopup(true);
  const handleConfirmCancel = () => navigate('/Events');

  const renderPopup = (title, message, onConfirm, onClose) => (
    <div style={overlayStyle}>
      <div style={popupStyle}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button onClick={onConfirm} style={confirmButtonStyle}>Confirm</button>
          <button onClick={onClose} style={closeButtonStyle}>Close</button>
        </div>
      </div>
    </div>
  );

  if (!activityData) {
    return (
      <>
        <MenuBar links={links} />
        <main style={{ padding: '30px', textAlign: 'center' }}>
          <h2>Loading activity data...</h2>
        </main>
        <footer><ContactInfo /></footer>
      </>
    );
  }

  return (
    <>
      <MenuBar links={links} />

      <header style={{ padding: '30px 20px' }}>
        <h1>Joyful Journeys</h1>
        <p>Unforgettable experiences await!</p>
      </header>

      {showCancelPopup && renderPopup(
        "Cancel Edit",
        "Are you sure you want to discard your changes?",
        handleConfirmCancel,
        () => setShowCancelPopup(false)
      )}

      {showSavePopup && renderPopup(
        "Confirm Save",
        "Are you sure you want to save the changes?",
        handleSaveConfirm,
        () => setShowSavePopup(false)
      )}

      <main style={{ padding: '20px', backgroundColor: 'white' }}>
        <div style={{ backgroundColor: '#9abf80', padding: '20px', maxWidth: '600px', margin: 'auto' }}>
          <h2>Activity: {activityData._id}</h2>
          <form style={{ display: 'flex', flexDirection: 'column' }}>
            {['description', 'region', 'capacity', 'venue', 'time', 'price', 'date'].map(field => (
              <label key={field} style={{ marginBottom: '12px' }}>
                {field.charAt(0).toUpperCase() + field.slice(1)}:
                <input
                  type={field === "date" ? "date" : (field === "capacity" || field === "price" ? "number" : "text")}
                  name={field}
                  value={activityData[field] || ''}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
                />
                {validationErrors[field] && (
                  <span style={{ color: 'red', fontSize: '12px' }}>{validationErrors[field]}</span>
                )}
              </label>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="button" onClick={handleEditToggle}>{isEditing ? "Save" : "Edit"}</button>
              <button type="button" onClick={handleCancelClick}>Cancel</button>
            </div>
          </form>
        </div>
      </main>

      <footer><ContactInfo /></footer>
    </>
  );
};

// Popup styles
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999
};

const popupStyle = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '10px',
  width: '400px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
};

const confirmButtonStyle = {
  marginRight: '10px',
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '8px 12px',
  border: 'none',
  borderRadius: '4px'
};

const closeButtonStyle = {
  backgroundColor: '#f44336',
  color: 'white',
  padding: '8px 12px',
  border: 'none',
  borderRadius: '4px'
};

export default EventDetail;
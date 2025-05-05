import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import axios from '../api/axiosInstance';

const MyPlanTable = ({ activities, setActivities }) => {
  const navigate = useNavigate();
  const touristId = localStorage.getItem('touristId');

  const handleView = (activityId) => {
    navigate(`/ViewActivity/${activityId}`);
  };

  const handleCancel = async (activityId) => {
    const confirm = window.confirm("Are you sure you want to cancel this activity?");
    if (!confirm) return;
  
    try {
      console.log("🧼 Deleting by activityId:", activityId);
      await axios.delete(`/tourists/${touristId}/myplan/${activityId}`);
      setActivities(prev => prev.filter(plan => plan.activity._id !== activityId));
      alert("✅ Activity removed from your plan.");
    } catch (err) {
      console.error('❌ Failed to cancel activity:', err);
      alert('❌ Failed to cancel. Please try again.');
    }
  };
  
  
  const handlePay = (entry) => {
    navigate('/Payment', {
      state: {
        activityName: entry.activity?.eventName,
        numberOfTickets: entry.seats
      }
    });
  };
  
  

  return (
    <div className="container mt-4 position-static">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Activity</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Seats Booked</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {activities.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">No activities added yet.</td>
            </tr>
          ) : (
            activities.map((entry, index) => (
              <tr key={entry._id || index}>
                <td>{entry.activity?.eventName || 'Unnamed Activity'}</td>
                <td>{entry.activity?.location || 'N/A'}</td>
                <td>{entry.activity?.date || 'N/A'}</td>
                <td>{entry.activity?.time || 'N/A'}</td>
                <td>{entry.seats}</td>
                <td>
                  <span className={`custom-badge ${getStatusClass(entry.status)}`}>
                    {entry.status}
                  </span>
                </td>
                <td style={{ position: 'relative' }}>
                  <div className="dropdown dropup">
                    <button
                      className="btn btn-sm btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Actions
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" style={{ zIndex: 1050 }}>
                      <li>
                        <button className="dropdown-item" onClick={() => handleView(entry.activity._id)}>
                          <i className="bi bi-eye me-2"></i>View
                        </button>
                      </li>
                      <li>
                      <button className="dropdown-item" onClick={() => handleCancel(entry.activity._id)}>
                          <i className="bi bi-x-circle me-2"></i>Cancel
                        </button>
                      </li>
                      <li>
                      <button className="dropdown-item" onClick={() => handlePay(entry)}>

                          <i className="bi bi-currency-dollar me-2"></i>Pay
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const getStatusClass = (status) => {
  if (!status) return 'status-default';
  switch (status.trim().toLowerCase()) {
    case 'confirmed':
      return 'status-confirmed';
    case 'pending':
      return 'status-pending';
    case 'cancelled':
      return 'status-cancelled';
    default:
      return 'status-default';
  }
};

export default MyPlanTable;

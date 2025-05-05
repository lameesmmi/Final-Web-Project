import React, { useState, useEffect } from "react";
import AdminMenuBar from "../components/AdminMenuBar";
import { Alert, Button } from "react-bootstrap";
import { X } from "react-bootstrap-icons";
import axios from "../api/axiosInstance"; 

const PendingActivity = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data } = await axios.get("/pendingActivities");
        setActivities(data);
        setFilteredActivities(data);
      } catch (err) {
        console.error("Failed to fetch pending activities:", err);
      }
    };
    fetchActivities();
  }, []);

  const handleActionSelect = async (id, action) => {
    try {
      await axios.post(`/pendingActivities/${id}/action`, { action });

      const updated = activities.map((a) =>
        a._id === id ? { ...a, action } : a
      );
      setActivities(updated);
      setFilteredActivities(updated);
    } catch (err) {
      console.error("Failed to update activity:", err);
    }
  };

  const handleSearchAndFilter = () => {
    const term = searchTerm.trim().toLowerCase();
    const filtered = activities.filter((a) => {
      const matchSearch =
        a.username?.toLowerCase().includes(term) ||
        a.description?.toLowerCase().includes(term);
      const matchStatus =
        filterStatus === "All" ||
        (filterStatus === "Approved" && a.action === "Approve Activity") ||
        (filterStatus === "Rejected" && a.action === "Reject Activity") ||
        (filterStatus === "Pending" && !a.action);
      return matchSearch && matchStatus;
    });
    setFilteredActivities(filtered);
    setShowError(filtered.length === 0);
  };

  useEffect(() => {
    handleSearchAndFilter();
  }, [searchTerm, filterStatus, activities]);

  const clearSearch = () => {
    setSearchTerm("");
    setFilterStatus("All");
    setFilteredActivities(activities);
    setShowError(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <AdminMenuBar />

      {showError && (
        <Alert variant="danger" className="text-center position-fixed top-0 w-100 z-3">
          No matching results found.
          <Button variant="outline-danger" onClick={clearSearch}>OK</Button>
        </Alert>
      )}

      <div className="container mt-4">
        <h2 className="fw-bold mb-3 text-center">Pending Activities</h2>

        <div className="d-flex justify-content-between flex-wrap align-items-center mb-3 gap-2">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ width: "250px" }}
          >
            <option value="All">All</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Pending">Pending</option>
          </select>

          <div className="d-flex gap-2 align-items-center position-relative">
            <input
              type="text"
              className="form-control pe-5"
              placeholder="Search By Username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingRight: "2.5rem" }}
            />
            {searchTerm && (
              <X
                size={18}
                style={{
                  position: "absolute",
                  right: "100px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#888"
                }}
                onClick={clearSearch}
              />
            )}
            <button
              className="btn"
              style={{ backgroundColor: "#9abf80", color: "white" }}
              onClick={handleSearchAndFilter}
            >
              Search
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-bordered text-center">
            <thead style={{ backgroundColor: "#6c63ac", color: "white" }}>
              <tr>
                <th>Username</th>
                <th>Description</th>
                <th>Place</th>
                <th>Time</th>
                <th>Attachments</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((a) => (
                <tr key={a._id}>
                  <td>{a.username}</td>
                  <td>{a.description}</td>
                  <td>{a.place}</td>
                  <td>{new Date(a.timestamp).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-link"
                      onClick={() => {
                        setModalImage(a.attachmentUrl);
                        setShowModal(true);
                      }}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <div className="dropdown">
                      <button
                        className="btn btn-light dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        {a.action || "Select Action"}
                      </button>
                      <ul className="dropdown-menu text-start">
                        {["Approve Activity", "Reject Activity"].map((opt, idx) => (
                          <li key={idx}>
                            <button
                              className="dropdown-item"
                              onClick={() => handleActionSelect(a._id, opt)}
                            >
                              {opt}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div
          className="modal show fade"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Attachment</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div className="modal-body text-center">
                <img
                  src={modalImage}
                  alt="Attachment"
                  style={{ maxWidth: "100%", height: "auto" }}
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingActivity;

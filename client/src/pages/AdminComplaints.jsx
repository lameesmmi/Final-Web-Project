import React, { useState, useEffect } from "react";
import AdminMenuBar from "../components/AdminMenuBar";
import { Alert, Button } from "react-bootstrap";
import { X, Trash } from "react-bootstrap-icons";
import axios from "../api/axiosInstance"; // ✅ Import your axios instance

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showError, setShowError] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [actionFilter, setActionFilter] = useState("All");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const { data } = await axios.get("/complaints");
        setComplaints(data);
        setFilteredComplaints(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchComplaints();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this complaint?")) return;
    try {
      await axios.delete(`/complaints/${id}`);
      const updated = complaints.filter((c) => c._id !== id);
      setComplaints(updated);
      setFilteredComplaints(updated);
    } catch (err) {
      console.error("Failed to delete complaint:", err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.post(`/complaints/${id}/status`, { status: newStatus });
      const updated = complaints.map((c) =>
        c._id === id ? { ...c, status: newStatus } : c
      );
      setComplaints(updated);
      setFilteredComplaints(updated);
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleActionChange = async (id, newAction) => {
    try {
      await axios.post(`/complaints/${id}/action`, { action: newAction });
      const updated = complaints.map((c) =>
        c._id === id ? { ...c, action: newAction } : c
      );
      setComplaints(updated);
      setFilteredComplaints(updated);
    } catch (err) {
      console.error("Failed to update action:", err);
    }
  };

  const handleSearchAndFilter = () => {
    const term = searchTerm.trim().toLowerCase();
    let filtered = [...complaints];

    if (term) {
      filtered = filtered.filter(
        (c) =>
          c.username?.toLowerCase().includes(term) ||
          c.reportedUsername?.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (c) => c.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (actionFilter !== "All") {
      filtered = filtered.filter(
        (c) => c.action?.toLowerCase() === actionFilter.toLowerCase()
      );
    }

    setFilteredComplaints(filtered);
    setShowError(filtered.length === 0);
  };

  useEffect(() => {
    handleSearchAndFilter();
  }, [searchTerm, statusFilter, actionFilter, complaints]);

  const clearSearch = () => {
    setSearchTerm("");
  };

  const getStatusStyle = (status) => {
    const base = {
      padding: "5px 15px",
      borderRadius: "20px",
      fontWeight: "500",
      display: "inline-block"
    };
    switch (status?.toLowerCase()) {
      case "confirmed": return { ...base, backgroundColor: "#28a745", color: "white" };
      case "pending": return { ...base, backgroundColor: "#ffc107", color: "black" };
      case "reviewed": return { ...base, backgroundColor: "#007bff", color: "white" };
      case "dismissed": return { ...base, backgroundColor: "#dc3545", color: "white" };
      default: return { ...base, backgroundColor: "#6c757d", color: "white" };
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <AdminMenuBar />

      {showError && (
        <Alert variant="danger" className="text-center position-fixed top-0 w-100 z-3">
          No matching results found.
          <Button
            variant="outline-danger"
            onClick={() => {
              setShowError(false);
              setSearchTerm("");
              setStatusFilter("All");
              setActionFilter("All");
              setFilteredComplaints(complaints);
            }}
          >
            OK
          </Button>
        </Alert>
      )}

      <div className="container mt-4">
        <h2 className="fw-bold mb-3 text-center">Complaints</h2>

        <div className="d-flex flex-wrap justify-content-between mb-3 align-items-center gap-2">
          <div className="d-flex gap-2">
            <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Dismissed">Dismissed</option>
            </select>

            <select className="form-select" value={actionFilter} onChange={(e) => setActionFilter(e.target.value)}>
              <option value="All">All Actions</option>
              <option value="Warn">Warn</option>
              <option value="Suspend">Suspend</option>
              <option value="Ban">Ban</option>
              <option value="None">None</option>
            </select>
          </div>

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
                onClick={() => {
                  setSearchTerm("");
                  handleSearchAndFilter();
                }}
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
                <th>Reported Username</th>
                <th>Description</th>
                <th>Time</th>
                <th>Status</th>
                <th>Change Status</th>
                <th>Action</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.length === 0 ? (
                <tr><td colSpan="8">Loading complaints...</td></tr>
              ) : (
                filteredComplaints.map((c) => (
                  <tr key={c._id}>
                    <td>{c.username}</td>
                    <td>{c.reportedUsername}</td>
                    <td>{c.description}</td>
                    <td>{new Date(c.time).toLocaleString()}</td>
                    <td><span style={getStatusStyle(c.status)}>{c.status}</span></td>
                    <td>
                      <select className="form-select" value={c.status || 'Pending'} onChange={(e) => handleStatusChange(c._id, e.target.value)}>
                        {["Pending", "Confirmed", "Reviewed", "Dismissed"].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select className="form-select" value={c.action || 'None'} onChange={(e) => handleActionChange(c._id, e.target.value)}>
                        {["None", "Warn", "Suspend", "Ban"].map((a) => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button className="btn btn-danger" onClick={() => handleDelete(c._id)}>
                        <Trash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminComplaints;

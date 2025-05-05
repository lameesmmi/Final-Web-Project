// Path: src/components/AdminMenuBar.jsx

import React from "react";
import { Link } from "react-router-dom";

const AdminMenuBar = () => {
  const adminLinks = [
    { label: "Dashboard", path: "/AdminDashboard" }, 
    { label: "User Management", path: "/UserManagement" }, 
    { label: "Pending Activities", path: "/PendingActivity" }, 
    { label: "Pending Registrations", path: "/pending-registrations" },   
    { label: "Complaints", path: "/AdminComplaints" }, // ← add comma here
    { label: "Logout", path: "/Home" },
  ];
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light menu-bar py-1">
      <div className="container d-flex align-items-center justify-content-between">
        
        {/* Logo on the far left */}
        <Link className="navbar-brand d-flex align-items-center" to="/AdminDashboard">
        <img
            className="logo-img d-block"
            src="/logo.png"
            alt="Jaddwill Logo"
          />
        </Link>

        {/* Hamburger button for mobile responsiveness */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAdmin"
          aria-controls="navbarNavAdmin"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Admin Nav links */}
        <div className="collapse navbar-collapse justify-content-start" id="navbarNavAdmin">
          <ul className="navbar-nav ms-3">
            {adminLinks.map((link, index) => (
              <li className="nav-item" key={index}>
                <Link className="nav-link menu-text" to={link.path}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Camels icon on the far right */}
        <Link className="navbar-brand d-flex align-items-left" to="/AdminDashboard">
          <img
            className="icon-img d-block"
            src="/camels.png"
            alt="Camels"
          />
        </Link>

      </div>
    </nav>
  );
};

export default AdminMenuBar;

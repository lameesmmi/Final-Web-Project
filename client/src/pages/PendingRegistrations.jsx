import React, { useState } from 'react';
import '../App.css';
import AdminMenuBar from "../components/AdminMenuBar";

const PendingRegistrations = () => {
  const allRegistrations = [
    { name: 'Layla Alqahtani', email: 'layla@gmail.com', username: 'layla23', level: 'Tourist' },
    { name: 'Mohammed Alzahrani', email: 'mo.zahrani@gmail.com', username: 'mohz', level: 'Activity Provider' },
    { name: 'Sara Almutairi', email: 'sara.mutairi@gmail.com', username: 'sara_m', level: 'Tour Guide' },
    { name: 'Faisal Alharbi', email: 'faisal.h@gmail.com', username: 'faisal_98', level: 'Tourist' },
    { name: 'Noura Alshehri', email: 'noura.s@gmail.com', username: 'noura_s', level: 'Activity Provider' },
    { name: 'Khalid Alotaibi', email: 'khalid.o@gmail.com', username: 'khalid_90', level: 'Tour Guide' }
  ];

  const [levelFilter, setLevelFilter] = useState('');
  const [usernameSearch, setUsernameSearch] = useState('');

  const handleAccept = (name) => {
    if (window.confirm(`Are you sure you want to accept ${name}?`)) {
      alert(`${name} accepted`);
    }
  };

  const handleReject = (name) => {
    if (window.confirm(`Are you sure you want to reject ${name}?`)) {
      alert(`${name} rejected`);
    }
  };

  const filteredRegistrations = allRegistrations.filter(reg => {
    const matchesLevel = levelFilter === '' || reg.level === levelFilter;
    const matchesUsername = reg.username.toLowerCase().includes(usernameSearch.toLowerCase());
    return matchesLevel && matchesUsername;
  });

  return (
    <>
      <AdminMenuBar />
      <div className="container mt-5">
        <h2 className="mb-4">Pending Registrations</h2>

        <div className="d-flex justify-content-between mb-3">
          <select
            className="form-select w-25"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <option value="">Filter By</option>
            <option value="Tourist">Tourist</option>
            <option value="Activity Provider">Activity Provider</option>
            <option value="Tour Guide">Tour Guide</option>
          </select>

          <input
            type="text"
            className="form-control w-25"
            placeholder="Search By Username"
            value={usernameSearch}
            onChange={(e) => setUsernameSearch(e.target.value)}
          />
        </div>

        <table className="table table-bordered table-striped">
          <thead className="table-primary text-center">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Level</th>
              <th>Action</th>
              <th>Attachments</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.map((reg, index) => (
              <tr key={index}>
                <td>{reg.name}</td>
                <td>{reg.email}</td>
                <td>{reg.username}</td>
                <td>{reg.level}</td>
                <td className="text-center">
                  <button className="btn btn-success btn-sm me-2" onClick={() => handleAccept(reg.name)}>Accept</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleReject(reg.name)}>Reject</button>
                </td>
                <td className="text-center">
                  <button className="btn btn-primary btn-sm">View</button>
                </td>
              </tr>
            ))}
            {filteredRegistrations.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">No results found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PendingRegistrations;

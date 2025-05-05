import React from 'react';
import '../App.css';

const UserManagementList = ({ users, onActivate, onDeactivate, onDelete }) => {
  return (
    <div className="container mt-4 position-static">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Level</th>
            <th>Status</th>
            <th>Notifications</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">Please select the type of user...</td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.level}</td>
                <td>
                  <span className={`custom-badge ${user.status === 'active' ? 'status-confirmed' : 'status-cancelled'}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.notifications ? 'Enabled' : 'Disabled'}</td>
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
                      {user.status === 'inactive' && (
                        <li>
                          <button className="dropdown-item" onClick={() => onActivate(user)}>
                            <i className="bi bi-check-circle me-2"></i>Activate
                          </button>
                        </li>
                      )}
                      {user.status === 'active' && (
                        <li>
                          <button className="dropdown-item" onClick={() => onDeactivate(user)}>
                            <i className="bi bi-x-circle me-2"></i>Deactivate
                          </button>
                        </li>
                      )}
                      <li>
                        <button className="dropdown-item text-danger" onClick={() => onDelete(user)}>
                          <i className="bi bi-trash me-2"></i>Delete
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

export default UserManagementList;

const users = [
    {
      name: 'Lamees Alikhwan',
      email: 'lamees@example.com',
      username: 'lamees01',
      level: 'Admin',
      status: 'active',
      notifications: true
    },
    {
      name: 'Aisha Salem',
      email: 'aisha@example.com',
      username: 'aisha_s',
      level: 'User',
      status: 'inactive',
      notifications: false
    }
  ];
  
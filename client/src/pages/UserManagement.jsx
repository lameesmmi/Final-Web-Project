import React, { useState, useEffect } from 'react';
import axios from '../api/axiosInstance'; 
import UserManagementList from '../components/UserManagementList';
import '../App.css';
import AdminMenuBar from '../components/AdminMenuBar';

const UserManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchTourists = async () => {
      try {
        const res = await axios.get('/tourists');
        const mapped = res.data.map(t => ({
          _id: t._id,
          name: t.fullName,
          email: t.email,
          username: t.username,
          level: 'Tourist',
          status: t.status || 'active',
          notifications: true
        }));
        setUsers(mapped);
      } catch (err) {
        console.error('Failed to fetch tourists:', err);
      }
    };

    const fetchGuides = async () => {
      try {
        const res = await axios.get('/guides');
        const mapped = res.data.map(g => ({
          _id: g._id,
          name: `${g.firstName} ${g.lastName}`,
          email: g.email,
          username: g.username,
          level: 'Tour Guide',
          status: g.status || 'active',
          notifications: true
        }));
        setUsers(mapped);
      } catch (err) {
        console.error('Failed to fetch guides:', err);
      }
    };

    const fetchProviders = async () => {
      try {
        const res = await axios.get('/providers');
        const mapped = res.data.map(p => ({
          _id: p._id,
          name: p.companyName,
          email: p.email,
          username: p.email.split('@')[0], 
          level: 'Activity Provider',
          status: p.status || 'active',
          notifications: true
        }));
        setUsers(mapped);
      } catch (err) {
        console.error('Failed to fetch providers:', err);
      }
    };

    if (levelFilter === 'Tourist') {
      fetchTourists();
    } else if (levelFilter === 'Tour Guide') {
      fetchGuides();
    } else if (levelFilter === 'Activity Provider') {
      fetchProviders();
    } else {
      setUsers([]);
    }
  }, [levelFilter]);

  const getRouteFromLevel = (level) => {
    if (level === 'Tourist') return 'tourists';
    if (level === 'Tour Guide') return 'guides';
    if (level === 'Activity Provider') return 'providers';
    return '';
  };

  const handleActivate = async (user) => {
    const route = getRouteFromLevel(user.level);
    try {
      await axios.patch(`/${route}/${user._id}/status`, {
        status: 'active'
      });
      setUsers(prev =>
        prev.map(u => (u._id === user._id ? { ...u, status: 'active' } : u))
      );
    } catch (err) {
      console.error('Failed to activate user:', err);
    }
  };

  const handleDeactivate = async (user) => {
    const route = getRouteFromLevel(user.level);
    try {
      await axios.patch(`/${route}/${user._id}/status`, {
        status: 'inactive'
      });
      setUsers(prev =>
        prev.map(u => (u._id === user._id ? { ...u, status: 'inactive' } : u))
      );
    } catch (err) {
      console.error('Failed to deactivate user:', err);
    }
  };

  const handleDelete = async (user) => {
    const route = getRouteFromLevel(user.level);
    try {
      await axios.delete(`/${route}/${user._id}`);
      setUsers(prev => prev.filter(u => u._id !== user._id));
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesUsername = user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter ? user.level === levelFilter : true;
    return matchesUsername && matchesLevel;
  });

  return (
    <>
      <AdminMenuBar />
      <div className="container mt-5">
        <h2 className="mb-4">User Management</h2>
        <div className="d-flex justify-content-between mb-3">
          <select
            className="form-select w-25"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <option value="">Select User Type</option>
            <option value="Tourist">Tourist</option>
            <option value="Activity Provider">Activity Provider</option>
            <option value="Tour Guide">Tour Guide</option>
          </select>
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search By Username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <UserManagementList
          users={filteredUsers}
          onActivate={handleActivate}
          onDeactivate={handleDeactivate}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default UserManagementPage;

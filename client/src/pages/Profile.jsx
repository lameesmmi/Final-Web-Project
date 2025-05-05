// ✅ Full working Profile.jsx (frontend page)
import React, { useState, useEffect, useRef } from 'react';
import '../styles/AcProfile.css';
import Navbar from '../components/Navbar';
import axios from '../api/axiosInstance';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [overview, setOverview] = useState('');
  const [about, setAbout] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [telephone, setTelephone] = useState('');
  const [certifications, setCertifications] = useState([]);
  const [services, setServices] = useState([]);
  const [logo, setLogo] = useState('');
  const [profileId, setProfileId] = useState(null); // ⬅️ important for updating

  const logoInputRef = useRef(null);
  const certInputRef = useRef(null);
  const [newServiceImage, setNewServiceImage] = useState(null);
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServiceDescription, setNewServiceDescription] = useState('');

  useEffect(() => {
    axios.get('/provider-profile')
      .then((res) => {
        const data = res.data;
        setProfileId(data._id);
        setName(data.companyInfo?.name || '');
        setLogo(data.companyInfo?.logo || '');
        setOverview(data.companyInfo?.overview || '');
        setAbout(data.companyInfo?.about || '');
        setEmail(data.contact?.email || '');
        setPhone(data.contact?.phone || '');
        setTelephone(data.contact?.telephone || '');
        setCertifications(data.certifications || []);
        setServices(data.services || []);
      })
      .catch((err) => console.error('Failed to load profile:', err));
  }, []);

  const handleSave = async () => {
    try {
      await axios.put('/provider-profile', {
        _id: profileId, // ⬅️ send id to update existing document
        companyInfo: { name, logo, overview, about },
        contact: { email, phone, telephone },
        certifications,
        services
      });
      setIsEditing(false);
      alert('✅ Profile updated successfully');
    } catch (err) {
      console.error('Failed to save profile:', err);
      alert('❌ Error saving profile');
    }
  };

  const handleRemoveCert = (index) => {
    const updated = [...certifications];
    updated.splice(index, 1);
    setCertifications(updated);
  };

  const handleRemoveService = (index) => {
    const updated = [...services];
    updated.splice(index, 1);
    setServices(updated);
  };

  const handleAddService = () => {
    if (newServiceImage && newServiceTitle) {
      setServices([...services, { image: newServiceImage, title: newServiceTitle, description: newServiceDescription }]);
      setNewServiceImage(null);
      setNewServiceTitle('');
      setNewServiceDescription('');
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">Welcome {name}!</h1>

        <div className="profile-header section">
          {isEditing ? (
            <div style={{ position: 'relative' }}>
              <img className="profile-logo" src={logo} alt="Company Logo" />
              <button className="upload-btn" onClick={() => logoInputRef.current.click()}>Upload</button>
              <input type="file" accept="image/*" ref={logoInputRef} style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) setLogo(URL.createObjectURL(file));
                }}
              />
            </div>
          ) : (
            <img className="profile-logo" src={logo} alt="Company Logo" />
          )}

          <div className="profile-summary">
            <h2 className="section-title">Organization overview:</h2>
            {isEditing ? (
              <textarea className="body-text" value={overview} onChange={(e) => setOverview(e.target.value)} />
            ) : (
              <p className="body-text">{overview}</p>
            )}
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">About Us</h2>
          {isEditing ? (
            <textarea className="body-text" value={about} onChange={(e) => setAbout(e.target.value)} />
          ) : (
            <p className="body-text">{about}</p>
          )}
        </div>

        <div className="section">
          <h2 className="section-title">Services Offered</h2>
          <div className="services-grid">
            {services.map((service, i) => (
              <div key={i} className="service-card">
                <div className="service-image-wrapper">
                  <img src={service.image} className="service-image" alt={service.title} />
                  {isEditing && <button className="delete-btn" onClick={() => handleRemoveService(i)}>🗑</button>}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
            {isEditing && (
              <div className="service-card">
                <input type="file" accept="image/*" onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) setNewServiceImage(URL.createObjectURL(file));
                }} />
                <input type="text" placeholder="Title" value={newServiceTitle} onChange={(e) => setNewServiceTitle(e.target.value)} className="body-text" />
                <textarea placeholder="Description" value={newServiceDescription} onChange={(e) => setNewServiceDescription(e.target.value)} className="body-text" />
                <button className="upload-btn" style={{ marginTop: '10px' }} onClick={handleAddService}>Add</button>
              </div>
            )}
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Certifications</h2>
          <div className="certs-list">
            {certifications.map((cert, i) => (
              <div key={i} className="cert-box">
                <img src={cert} alt={`Certificate ${i + 1}`} />
                {isEditing && <button onClick={() => handleRemoveCert(i)}>🗑</button>}
              </div>
            ))}
            {isEditing && (
              <>
                <button className="add-button" onClick={() => certInputRef.current.click()}>+ Add</button>
                <input type="file" accept="image/*" ref={certInputRef} style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setCertifications([...certifications, URL.createObjectURL(file)]);
                  }}
                />
              </>
            )}
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Our Contact Info:</h2>
          {isEditing ? (
            <>
              <input type="text" className="body-text" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="text" className="body-text" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <input type="text" className="body-text" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
            </>
          ) : (
            <>
              <p className="body-text">Email: {email}</p>
              <p className="body-text">Phone: {phone}</p>
              <p className="body-text">Telephone: {telephone}</p>
            </>
          )}
        </div>

        <button className="edit-button" onClick={() => {
          if (isEditing) handleSave();
          else setIsEditing(true);
        }}>
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>
    </>
  );
};

export default Profile;

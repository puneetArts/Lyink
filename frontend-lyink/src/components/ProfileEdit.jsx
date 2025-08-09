import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './ProfileEdit.css';  // in ProfileEdit.js
import Header from './Header';


const ProfileEdit = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    bio: '',
    major: '',
    year: '',
    interests: '',
    profilePic: ''
  });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!user) return;

    axios.get('http://localhost:5000/api/users/me', {
      headers: { Authorization: `Bearer ${user.token}` }
    })
    .then(res => {
      const { name, bio, major, year, interests, profilePic } = res.data;
      setForm({
        name: name || '',
        bio: bio || '',
        major: major || '',
        year: year || '',
        interests: interests ? interests.join(', ') : '',
        profilePic: profilePic || ''
      });
    })
    .catch(() => setMsg('Failed to load profile data'));
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    try {
      const dataToSend = {
        ...form,
        interests: form.interests.split(',').map(i => i.trim()).filter(i => i)
      };
      await axios.put('http://localhost:5000/api/users/me', dataToSend, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setMsg('Profile updated successfully');
      // Optionally refresh or redirect to profile page
      navigate(`/profile/${user._id}`);
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Update failed');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <Header/>
      <div className="profile-edit" style={{ maxWidth: 500, margin: '2rem auto', padding: '1rem', background: '#fff', borderRadius: 8 }}>
      
      <h2>Edit Profile</h2>
      {msg && <p>{msg}</p>}

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" value={form.name} onChange={handleChange} required />

        <label>Bio:</label>
        <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} />

        <label>Major:</label>
        <input name="major" value={form.major} onChange={handleChange} />

        <label>Year:</label>
        <input name="year" value={form.year} onChange={handleChange} />

        <label>Interests (comma separated):</label>
        <input name="interests" value={form.interests} onChange={handleChange} />

        <label>Profile Picture URL:</label>
        <input name="profilePic" value={form.profilePic} onChange={handleChange} placeholder="URL or path to image" />

        <button type="submit" style={{ marginTop: 10 }}>Save</button>
      </form>

      <button onClick={handleLogout} style={{ marginTop: 15, backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 12px', borderRadius: 4 }}>Logout</button>
    </div>
    </div>
  );
};

export default ProfileEdit;

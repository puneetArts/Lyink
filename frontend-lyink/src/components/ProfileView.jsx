import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './ProfileView.css';  // in ProfileView.js
import Header from './Header';

const ProfileView = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => setProfile(res.data))
      .catch(() => setMsg('Failed to load profile'));
  }, [id, user]);

  if (msg) return <p>{msg}</p>;
  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <Header/>
      <div className="profile-view" style={{ maxWidth: 500, margin: '2rem auto', padding: '1rem', background: '#fff', borderRadius: 8 }}>
      <h2>{profile.name}</h2>
      {profile.profilePic && (
        <img src={profile.profilePic} alt="Profile" style={{ width: 120, borderRadius: '50%' }} />
      )}
      <p><b>Email:</b> {profile.email}</p>
      <p><b>College:</b> {profile.college?.name}</p>
      <p><b>Bio:</b> {profile.bio || 'N/A'}</p>
      <p><b>Major:</b> {profile.major || 'N/A'}</p>
      <p><b>Year:</b> {profile.year || 'N/A'}</p>
      <p><b>Interests:</b> {profile.interests && profile.interests.length ? profile.interests.join(', ') : 'N/A'}</p>

      {/* Link to your own profile edit if viewing self */}
      {profile && user && profile._id.toString() === user._id.toString() && (
  <Link to="/edit-profile">Edit Profile</Link>
)}


    </div>
    </div>
  );
};

export default ProfileView;

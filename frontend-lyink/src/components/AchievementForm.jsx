import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const AchievementForm = ({ onAdded }) => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [date, setDate] = useState("");
  const [certificateFile, setCertificateFile] = useState(null);
  const [msg, setMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('date', date);
      if (certificateFile) {
        formData.append('certificate', certificateFile);
      }

    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/achievements`, formData, {
  headers: {
    Authorization: `Bearer ${user.token}`,
    'Content-Type': 'multipart/form-data'
  }
});


      setMsg('Achievement added!');
      setTitle('');
      setDescription('');
      setYear('');
      setCertificateFile(null);
      if (onAdded) onAdded(res.data.achievement);
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Error adding achievement');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <h4>Add Achievement</h4>
      {msg && <p>{msg}</p>}
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <textarea style={{width: "400px", height: "50px", padding:"1rem",borderRadius:"0.3rem"}} value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />

      <input type="file" onChange={e => setCertificateFile(e.target.files[0])} />
      <button type="submit">Add</button>
    </form>
  );
};

export default AchievementForm;

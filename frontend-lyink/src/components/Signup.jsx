import React, { useState, useEffect } from 'react';
import axios from 'axios';
import illustration from '../assets/images/illustration.png'
import './Signup.css'
const Signup = () => {
  const [colleges, setColleges] = useState([]);
  const [form, setForm] = useState({
    name: '', email: '', password: '', collegeId: ''
  });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    axios.get("http://localhost:5000/api/colleges")
      .then(res => setColleges(res.data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", form);
      setMsg("Signup successful! You can now log in.");
      setForm({ name: '', email: '', password: '', collegeId: '' });
    } catch (err) {
      setMsg(err.response?.data?.msg || "Error during signup");
    }
  };

  return (
    <div className='signup-page'>
          <img style={{margin:"150px", maxHeight:"450px"}} src={illustration} alt='illustration'/>
          <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required />
        <select name="collegeId" value={form.collegeId} onChange={handleChange} required>
          <option value="">Select College</option>
          {colleges.map(c => <option value={c._id} key={c._id}>{c.name}</option>)}
        </select>
        <button type="submit">Signup</button>
      </form>
      <p style={{color:"red"}}>{msg}</p>
      <a href="/login">Already have an account?</a><a href="/login">Login</a>
    </div>
    </div>
  );
};

export default Signup;

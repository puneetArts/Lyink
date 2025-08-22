// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthContext";
// import illustration from '../assets/images/illustration.png'
// import './Login.css'
// const Login = () => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [msg, setMsg] = useState('');
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMsg('');
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", form);
//       await login(res.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       setMsg(err.response?.data?.msg || "Login Error");
//     }
//   };

//   return (
//     <div className='login-page'>
//       <img style={{margin:"150px ", maxHeight:"450px"}} src={illustration} alt='illustration'/>
//       <div className="login-container">
      
//       <h2 style={{color:"black"}}>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
//         <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
//         <button type="submit">Login</button>
//       </form>
//       <p style={{color:"red"}}>{msg}</p>
//       <a className='switch' href="/signup">Don't have an account?</a>
//     </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import illustration from '../assets/images/illustration.png';
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email: form.email.trim(),
          password: form.password
        }
      );
      await login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Login Error");
    }
  };

  return (
    <div className='login-page'>
      <img
        style={{ margin: "150px", maxHeight: "450px" }}
        src={illustration}
        alt='illustration'
      />
      <div className="login-container">
        <h2 style={{ color: "black" }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        {msg && <p style={{ color: "red" }}>{msg}</p>}
        <a className='switch' href="/signup">Don't have an account?</a>
      </div>
    </div>
  );
};

export default Login;

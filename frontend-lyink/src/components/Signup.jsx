// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import illustration from '../assets/images/illustration.png'
// // import './Signup.css'
// // const Signup = () => {
// //   const [colleges, setColleges] = useState([]);
// //   const [form, setForm] = useState({
// //     name: '', email: '', password: '', collegeId: ''
// //   });
// //   const [msg, setMsg] = useState('');
// //   const [msgType, setMsgType] = useState('');

// //   useEffect(() => {
// //     axios.get("http://localhost:5000/api/colleges")
// //       .then(res => setColleges(res.data));
// //   }, []);

// //   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setMsg('');
// //     setMsgType('');
// //     try {
// //       const res = await axios.post("http://localhost:5000/api/auth/signup", form);
// //       setMsg("Signup successful! You can now log in.");
// //       setMsgType('success');
// //       setForm({ name: '', email: '', password: '', collegeId: '' });
// //     } catch (err) {
// //       setMsg(err.response?.data?.msg || "Error during signup");
// //       setMsgType('error');
// //     }
// //   };

// //   return (
// //     <div className='signup-page'>
// //           <img style={{margin:"150px", maxHeight:"450px"}} src={illustration} alt='illustration'/>
// //           <div className="signup-container">
// //       <h2>Signup</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
// //         <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
// //         <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required />
// //         <select name="collegeId" value={form.collegeId} onChange={handleChange} required>
// //           <option value="">Select College</option>
// //           {colleges.map(c => <option value={c._id} key={c._id}>{c.name}</option>)}
// //         </select>
// //         <button type="submit">Signup</button>
// //       </form>
// //       <p style={{ color: msgType === 'success' ? 'green' : 'red' }}>{msg}</p>

// //       <a href="/login">Already have an account?</a><a href="/login">Login</a>
// //     </div>
// //     </div>
// //   );
// // };

// // export default Signup;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import illustration from '../assets/images/illustration.png';
// import './Signup.css';

// const Signup = () => {
//   const [colleges, setColleges] = useState([]);
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     collegeId: ''
//   });
//   const [msg, setMsg] = useState('');
//   const [msgType, setMsgType] = useState('');

//   useEffect(() => {
//     axios.get(`${process.env.REACT_APP_API_URL}/api/colleges`)
//       .then(res => setColleges(res.data))
//       .catch(() => {
//         setMsg('Failed to load colleges');
//         setMsgType('error');
//       });
//   }, []);

//   const handleChange = (e) => 
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMsg('');
//     setMsgType('');
    
//     try {
//       await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, form);
//       setMsg("Signup successful! You can now log in.");
//       setMsgType('success');
//       setForm({ name: '', email: '', password: '', collegeId: '' });
//     } catch (err) {
//       setMsg(err.response?.data?.msg || "Error during signup");
//       setMsgType('error');
//     }
//   };

//   return (
//     <div className='signup-page'>
//       <img
//         style={{ margin: "150px", maxHeight: "450px" }}
//         src={illustration}
//         alt='illustration'
//       />
      
//       <div className="signup-container">
//         <h2>Signup</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             name="name"
//             placeholder="Name"
//             value={form.name}
//             onChange={handleChange}
//             required
//           />

//           <input
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />

//           <input
//             name="password"
//             placeholder="Password"
//             type="password"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />

//           <select
//             name="collegeId"
//             value={form.collegeId}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select College</option>
//             {colleges.map(c => (
//               <option value={c._id} key={c._id}>{c.name}</option>
//             ))}
//           </select>

//           <button type="submit">Signup</button>
//         </form>

//         {msg && (
//           <p style={{ color: msgType === 'success' ? 'green' : 'red' }}>
//             {msg}
//           </p>
//         )}

//         <a href="/login">Already have an account? Login</a>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import illustration from '../assets/images/illustration.png';
import './Signup.css';

const Signup = () => {
  const [colleges, setColleges] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    collegeId: ''
  });
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('');

  useEffect(() => {
    // axios
    //   .get(`${process.env.REACT_APP_API_URL}/api/colleges`)
    //   .then(res => {
    //     console.log("Colleges API response:", res.data); // Debug log
    //     // Ensure data is an array before setting state
    //     if (Array.isArray(res.data)) {
    //       setColleges(res.data);
    //     } else if (Array.isArray(res.data.colleges)) {
    //       // If API wraps colleges in an object { colleges: [...] }
    //       setColleges(res.data.colleges);
    //     } else {
    //       setColleges([]);
    //       console.warn("Colleges API did not return an array.");
    //     }
    //   })
    //   .catch(err => {
    //     console.error("Error fetching colleges:", err);
    //     setMsg('Failed to load colleges');
    //     setMsgType('error');
    //   });
    axios.get(`${import.meta.env.VITE_API_URL}/api/colleges`)

    .then(res => {
      if (Array.isArray(res.data)) {
        setColleges(res.data);
      } else if (Array.isArray(res.data.colleges)) {
        setColleges(res.data.colleges);
      } else {
        setColleges([]);
        console.warn("Colleges API did not return an array.", res.data);
      }
    })
    .catch(err => {
      console.error("Error fetching colleges:", err);
      setColleges([]);
    });

  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setMsgType('');

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, form);
      setMsg("Signup successful! You can now log in.");
      setMsgType('success');
      setForm({ name: '', email: '', password: '', collegeId: '' });
    } catch (err) {
      console.error("Signup error:", err);
      setMsg(err.response?.data?.msg || "Error during signup");
      setMsgType('error');
    }
  };

  return (
    <div className='signup-page'>
      <img
        style={{ margin: "150px", maxHeight: "450px" }}
        src={illustration}
        alt='illustration'
      />

      <div className="signup-container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <select
            name="collegeId"
            value={form.collegeId}
            onChange={handleChange}
            required
          >
            <option value="">Select College</option>
            {Array.isArray(colleges) &&
              colleges.map(c => (
                <option value={c._id} key={c._id}>{c.name}</option>
              ))}
          </select>

          <button type="submit">Signup</button>
        </form>

        {msg && (
          <p style={{ color: msgType === 'success' ? 'green' : 'red' }}>
            {msg}
          </p>
        )}

        <a href="/login">Already have an account? Login</a>
      </div>
    </div>
  );
};

export default Signup;

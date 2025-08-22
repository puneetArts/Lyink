// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from "../contexts/AuthContext";
// import Header from './Header';
// import './FriendRequests.css'
// const FriendRequests = () => {
//   const { user } = useContext(AuthContext);
//   const [requests, setRequests] = useState([]);
//   const [msg, setMsg] = useState('');

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/users/friend-requests", {
//       headers: { Authorization: `Bearer ${user.token}` }
//     })
//     .then(res => setRequests(res.data))
//     .catch(() => setMsg("Error loading friend requests"));
//   }, [user]);

//   const handleAction = async (senderId, action) => {
//     setMsg('');
//     try {
//       await axios.post(
//         `http://localhost:5000/api/users/friend-request/${action}`, // 'accept' or 'decline'
//         { senderId },
//         { headers: { Authorization: `Bearer ${user.token}` } }
//       );
//       setRequests(requests.filter(r => r._id !== senderId));
//       setMsg(`Friend request ${action}ed`);
//     } catch (err) {
//       setMsg(err.response?.data?.msg || "Action failed");
//     }
//   };

//   if (!requests.length) return <div><Header/><p style={{margin:"10px 180px"}}>No pending friend requests</p></div>;

//   return (
//     <div>
//       <Header/>
//       <div className='main-body'>
//         <h3 >Friend Requests</h3>
//         <div className='main-friend-req'>
      
//       {requests.map(r => (
//         <div key={r._id} className='friend-req'>
//           <div><strong>{r.name}</strong> <small>({r.email})</small></div>
//           <div className='btn-acc-dec'>
//             <button className='btn1' 
//             onClick={() => handleAction(r._id, 'accept')}>Accept</button>
//             <button className='btn2'  onClick={() => handleAction(r._id, 'decline')}>Decline</button>
//           </div>
//         </div>
//       ))}
//       {msg && <p>{msg}</p>}
//     </div>
//       </div>
//     </div>
//   );
// };

// export default FriendRequests;


import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../contexts/AuthContext";
import Header from './Header';
import './FriendRequests.css';

const FriendRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!user) return;
    
    axios.get(`${import.meta.env.VITE_API_URL}/api/users/friend-requests`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
    .then(res => setRequests(res.data))
    .catch(() => setMsg("Error loading friend requests"));
  }, [user]);

  const handleAction = async (senderId, action) => {
    setMsg('');
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/friend-request/${action}`,
        { senderId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setRequests(requests.filter(r => r._id !== senderId));
      setMsg(`Friend request ${action}ed`);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Action failed");
    }
  };

  if (!requests.length) {
    return (
      <div>
        <Header />
        <p style={{ margin: "10px 180px" }}>No pending friend requests</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className='main-body'>
        <h3>Friend Requests</h3>
        <div className='main-friend-req'>
          {requests.map(r => (
            <div key={r._id} className='friend-req' style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              
              {/* Profile Picture with Cloudinary support */}
              <img
                src={r.profilePic || '/default-avatar.jpg'}
                alt={`${r.name}'s profile`}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover"
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/default-avatar.jpg';
                }}
              />

              <div style={{ flex: 1 }}>
                <strong>{r.name}</strong> <small>({r.email})</small>
              </div>

              <div className='btn-acc-dec'>
                <button
                  className='btn1'
                  onClick={() => handleAction(r._id, 'accept')}
                >
                  Accept
                </button>
                <button
                  className='btn2'
                  onClick={() => handleAction(r._id, 'decline')}
                >
                  Decline
                </button>
              </div>
            </div>
          ))}

          {msg && <p>{msg}</p>}
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;

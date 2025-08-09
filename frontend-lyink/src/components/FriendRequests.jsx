import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../contexts/AuthContext";
import Header from './Header';

const FriendRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    axios.get("http://localhost:5000/api/users/friend-requests", {
      headers: { Authorization: `Bearer ${user.token}` }
    })
    .then(res => setRequests(res.data))
    .catch(() => setMsg("Error loading friend requests"));
  }, [user]);

  const handleAction = async (senderId, action) => {
    setMsg('');
    try {
      await axios.post(
        `http://localhost:5000/api/users/friend-request/${action}`, // 'accept' or 'decline'
        { senderId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setRequests(requests.filter(r => r._id !== senderId));
      setMsg(`Friend request ${action}ed`);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Action failed");
    }
  };

  if (!requests.length) return <div><Header/><p>No pending friend requests</p></div>;

  return (
    <div>
      <Header/>
      <div>
      <h3>Friend Requests</h3>
      {requests.map(r => (
        <div key={r._id} style={{ borderBottom: "1px solid #ccc", padding: "0.5rem 0" }}>
          <strong>{r.name}</strong> ({r.email})
          <div>
            <button onClick={() => handleAction(r._id, 'accept')}>Accept</button>
            <button onClick={() => handleAction(r._id, 'decline')}>Decline</button>
          </div>
        </div>
      ))}
      {msg && <p>{msg}</p>}
    </div>
    </div>
  );
};

export default FriendRequests;

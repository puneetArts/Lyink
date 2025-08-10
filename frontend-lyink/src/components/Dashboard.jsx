import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Header from './Header';
import './Dashboard.css'
const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState('');
  const [friendRequestsSent, setFriendRequestsSent] = useState([]);
  const [friends, setFriends] = useState([]);
  const [receivedRequestsCount, setReceivedRequestsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all users from the same college except current user
  useEffect(() => {
    if (!user) return;

    const fetchCollegeUsers = async () => {
      setLoading(true);
      setMsg('');
      try {
        const res = await axios.get("http://localhost:5000/api/users/college", {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setUsers(res.data.filter(u => u._id !== user._id));
      } catch (error) {
        setMsg("Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    fetchCollegeUsers();
  }, [user]);

  // Fetch current user's sent friend requests and friends
  useEffect(() => {
    if (!user) return;

    const fetchUserRelationships = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setFriendRequestsSent(res.data.friendRequestsSent || []);
        setFriends(res.data.friends || []);
      } catch {
        // silently ignore errors here
      }
    };

    fetchUserRelationships();
  }, [user]);

  // Fetch count of received friend requests
  useEffect(() => {
    if (!user) return;

    const fetchReceivedRequestsCount = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/friend-requests", {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setReceivedRequestsCount(res.data.length);
      } catch {
        setReceivedRequestsCount(0);
      }
    };

    fetchReceivedRequestsCount();
  }, [user]);

  // Handle sending a friend request
  const sendFriendRequest = async (receiverId) => {
    setMsg('');
    try {
      await axios.post(
        "http://localhost:5000/api/users/friend-request/send",
        { receiverId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setMsg('Friend request sent!');
      setFriendRequestsSent(prev => [...prev, receiverId]);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Failed to send friend request");
    }
  };

  // Check if friend request already sent to the user
  const isRequestSent = (userId) => {
    return friendRequestsSent.some(id => {
      if (typeof id === 'string') return id === userId;
      return id._id === userId;
    });
  };

  // Check if already friends with the user
  const isAlreadyFriend = (userId) => {
    return friends.some(f => {
      if (typeof f === 'string') return f === userId;
      return f._id === userId;
    });
  };

  return (
    
    <div>
      <Header/>
      <h3 style={{ color: 'white' }}>Welcome, {user.name} ({user.email})</h3>
      <div
      className="dashboard"
      style={{
        maxWidth: "85%",
        display:"flex",
        margin: "2rem auto",
        padding: "1rem",
        background: "#1b263b",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      
      <div className='my-profile-section' >
        <div >
          
          {/* Link to Edit Profile for logged-in user */}
          <Link to="/edit-profile" style={{ marginRight: '1rem', textDecoration: 'none' }} title="Edit your profile">
            <button className='btn-profile'>Edit Profile</button>
          </Link>
          {/* Link to Friend Requests */}
          <Link to="/friend-requests" style={{ textDecoration: "none" }}>
            <button className='btn-profile' title="View your received friend requests">
              Friend Requests ({receivedRequestsCount})
            </button>
          </Link>
        </div>

        {/* Logout Button
        <button
          onClick={() => { logout(); navigate("/login"); }}
          style={{
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: 4,
            cursor: "pointer"
          }}
          aria-label="Logout"
          title="Logout"
        >
          Logout
        </button> */}
      </div>

     <div className='peer-section'>
       <h2>Your Peers</h2>
      {msg && <p style={{ color: 'green' }}>{msg}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.length === 0 && <li>No other students found.</li>}
          {users.map(u => (
            <li key={u._id} className='peer-list-items'>
              <Link to={`/profile/${u._id}`} style={{ textDecoration: 'none', color:'white' }} title={`View ${u.name}'s profile`}>
                {u.name} 
              </Link>
              {isAlreadyFriend(u._id) ? (
                <button disabled className='btn-friends' aria-label="Friends" title="You are friends with this user">
                  Friends
                </button>
              ) : isRequestSent(u._id) ? (
                <button disabled className='btn-peer-req' aria-label="Request Sent" title="Friend request sent to this user">
                  Request Sent
                </button>
              ) : (
                <button
                  className='btn-add-friend'
                  onClick={() => sendFriendRequest(u._id)}
                  aria-label="Add Friend"
                  title={`Send friend request to ${u.name}`}
                >
                  Add Friend
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
     </div>
    </div>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../contexts/AuthContext";
import Header from './Header';

const FriendList = () => {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchFriends = async () => {
      setLoading(true);
      setMsg('');
      try {
        const res = await axios.get("http://localhost:5000/api/users/friends", {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setFriends(res.data);
      } catch (err) {
        setMsg("Error loading friends");
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [user]);

  if (loading) return <p>Loading friends...</p>;

  if (msg) return <p style={{ color: 'red' }}>{msg}</p>;

  if (!friends.length) return <div> <Header/><p>You have no friends added yet.</p></div>;

  return (
    <div>
      <Header/>
      
              <div>
      <h3>Your Friends</h3>
      <ul>
        {friends.map(f => (
          <li key={f._id}>{f.name} ({f.email})</li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default FriendList;

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // ⬅️ Import Link
import { AuthContext } from "../contexts/AuthContext";
import Header from './Header';
import './FriendList.css';

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

  return (
    <div>
      <Header />
      <div className="friend-list-container">
        {friends.length > 0 ? (
          <>
            <h3>Your Friends</h3>
            <ul>
              {friends.map(f => (
                <li key={f._id}>
                  {/* Friend Name clickable link */}
                  <Link
                    to={`/profile/${f._id}`} // ⬅️ Dynamic route to friend's profile
                    style={{ textDecoration: 'none', color: '#007bff' }} // Optional styling
                    title={`View ${f.name}'s profile`}
                  >
                    {f.name}
                  </Link>
                  <span style={{ marginLeft: '0.5rem', color: '#666' }}>
                    ({f.email})
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>You have no friends added yet.</p>
        )}
      </div>
    </div>
  );
}

export default FriendList;

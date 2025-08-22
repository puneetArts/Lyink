// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom'; // ⬅️ Import Link
// import { AuthContext } from "../contexts/AuthContext";
// import Header from './Header';
// import './FriendList.css';

// const FriendList = () => {
//   const { user } = useContext(AuthContext);
//   const [friends, setFriends] = useState([]);
//   const [msg, setMsg] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) return;

//     const fetchFriends = async () => {
//       setLoading(true);
//       setMsg('');
//       try {
//         const res = await axios.get("http://localhost:5000/api/users/friends", {
//           headers: { Authorization: `Bearer ${user.token}` }
//         });
//         setFriends(res.data);
//       } catch (err) {
//         setMsg("Error loading friends");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFriends();
//   }, [user]);

//   if (loading) return <p>Loading friends...</p>;
//   if (msg) return <p style={{ color: 'red' }}>{msg}</p>;

//   return (
//     <div>
//       <Header />
//       <div className="friend-list-container">
//         {friends.length > 0 ? (
//           <>
//             <h3>My Chain</h3>
//             <ul>
//               {friends.map(f => (
//                 <li key={f._id} style={{ background: "transparent", textAlign: "left", alignItems: "center", display: "flex", gap: "0.8rem" }}>
//                   {/* Friend profile picture with fallback */}
//                   <img
//                     src={f.profilePic ? `http://localhost:5000${f.profilePic}` : '/default-avatar.jpg'}
//                     alt={`${f.name}'s profile`}
//                     style={{
//                       width: "40px",
//                       height: "40px",
//                       borderRadius: "50%",
//                       objectFit: "cover"
//                     }}
//                     onError={(e) => { e.target.onerror = null; e.target.src = '/default-avatar.jpg'; }}
//                   />

//                   {/* Friend Name clickable link */}
//                   <div className='friends'>
//                     <Link
//                       to={`/profile/${f._id}`}
//                       style={{ textDecoration: 'none', color: 'white', fontWeight: 500 }}
//                       title={`View ${f.name}'s profile`}
//                     >
//                       {f.name}
//                     </Link>
//                     <span style={{ marginLeft: '0.5rem', color: "#a4a0a0" }}>
//                       ({f.email})
//                     </span>
//                   </div>
//                 </li>
//               ))}

//             </ul>
//           </>
//         ) : (
//           <p>You have no friends added yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default FriendList;

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/friends`, {
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

  if (loading) return <div style={{display: "flex", marginTop:"350px", alignItems:"center", justifyContent:"center"}}><p >Loading friends...</p></div>;
  if (msg) return <p style={{ color: 'red' }}>{msg}</p>;

  return (
    <div>
      <Header />
      <div className="friend-list-container">
        {friends.length > 0 ? (
          <>
            <h3>My Chain</h3>
            <ul>
              {friends.map(f => (
                <li
                  key={f._id}
                  style={{
                    background: "transparent",
                    textAlign: "left",
                    alignItems: "center",
                    display: "flex",
                    gap: "0.8rem"
                  }}
                >
                  {/* Profile picture with Cloudinary or default fallback */}
                  <img
                    src={f.profilePic || '/default-avatar.jpg'}
                    alt={`${f.name}'s profile`}
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

                  {/* Friend Name with link */}
                  <div className='friends'>
                    <Link
                      to={`/profile/${f._id}`}
                      style={{ textDecoration: 'none', color: 'white', fontWeight: 500 }}
                      title={`View ${f.name}'s profile`}
                    >
                      {f.name}
                    </Link>
                    <span style={{ marginLeft: '0.5rem', color: "#a4a0a0" }}>
                      ({f.email})
                    </span>
                  </div>
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
};

export default FriendList;

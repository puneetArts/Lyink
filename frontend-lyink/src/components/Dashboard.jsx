// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from "../contexts/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import Header from './Header';
// import './Dashboard.css'
// import AchievementsList from './AchievementsList';
// import PostsList from './PostsList';

// const Dashboard = () => {
//   const { user, logout } = useContext(AuthContext);
//   const [users, setUsers] = useState([]);
//   const [msg, setMsg] = useState('');
//   const [friendRequestsSent, setFriendRequestsSent] = useState([]);
//   const [friends, setFriends] = useState([]);
//   const [receivedRequestsCount, setReceivedRequestsCount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // NEW: State for college-wide posts & achievements
//   const [collegePosts, setCollegePosts] = useState([]);
//   const [collegeAchievements, setCollegeAchievements] = useState([]);

//   const navigate = useNavigate();

//   // Fetch all users from the same college except current user
//   useEffect(() => {
//     if (!user) return;

//     const fetchCollegeUsers = async () => {
//       setLoading(true);
//       setMsg('');
//       try {
//         const res = await axios.get("http://localhost:5000/api/users/college", {
//           headers: { Authorization: `Bearer ${user.token}` }
//         });
//         setUsers(res.data.filter(u => u._id !== user._id));
//       } catch (error) {
//         setMsg("Failed to load students");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCollegeUsers();
//   }, [user]);

//   // Fetch current user's sent friend requests and friends
//   useEffect(() => {
//     if (!user) return;

//     const fetchUserRelationships = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/users/me", {
//           headers: { Authorization: `Bearer ${user.token}` }
//         });
//         setFriendRequestsSent(res.data.friendRequestsSent || []);
//         setFriends(res.data.friends || []);
//       } catch {
//         // ignore errors silently
//       }
//     };

//     fetchUserRelationships();
//   }, [user]);

//   // Fetch count of received friend requests
//   useEffect(() => {
//     if (!user) return;

//     const fetchReceivedRequestsCount = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/users/friend-requests", {
//           headers: { Authorization: `Bearer ${user.token}` }
//         });
//         setReceivedRequestsCount(res.data.length);
//       } catch {
//         setReceivedRequestsCount(0);
//       }
//     };

//     fetchReceivedRequestsCount();
//   }, [user]);

//   // Fetch college posts and achievements (NEW)
//   useEffect(() => {
//     if (!user) return;

//     const fetchCollegeFeed = async () => {
//       try {
//         const [postsRes, achieRes] = await Promise.all([
//           axios.get("http://localhost:5000/api/posts/college", {
//             headers: { Authorization: `Bearer ${user.token}` }
//           }),
//           axios.get("http://localhost:5000/api/achievements/college", {
//             headers: { Authorization: `Bearer ${user.token}` }
//           })
//         ]);
//         setCollegePosts(postsRes.data || []);
//         setCollegeAchievements(achieRes.data || []);
//       } catch (err) {
//         console.error("Error loading college feed:", err);
//       }
//     };

//     fetchCollegeFeed();
//   }, [user]);

//   // Handle sending a friend request
//   const sendFriendRequest = async (receiverId) => {
//     setMsg('');
//     try {
//       await axios.post(
//         "http://localhost:5000/api/users/friend-request/send",
//         { receiverId },
//         { headers: { Authorization: `Bearer ${user.token}` } }
//       );
//       setMsg('Friend request sent!');
//       setFriendRequestsSent(prev => [...prev, receiverId]);
//     } catch (err) {
//       setMsg(err.response?.data?.msg || "Failed to send friend request");
//     }
//   };

//   const isRequestSent = (userId) => {
//     return friendRequestsSent.some(id => {
//       if (typeof id === 'string') return id === userId;
//       return id._id === userId;
//     });
//   };

//   const isAlreadyFriend = (userId) => {
//     return friends.some(f => {
//       if (typeof f === 'string') return f === userId;
//       return f._id === userId;
//     });
//   };

//   return (
//     <div>
//       <Header />
//       <h3 style={{ color: 'white', margin: "10px 180px" }}>
//         Welcome to,{" "}
//         <small style={{ opacity: 0.7, color: '#F79B72', fontSize: '20px' }}>
//           {user.college?.name || 'College not specified'}
//         </small>{" "}
//         Community
//       </h3>

//       <div
//         className="dashboard"
//         style={{
//           maxWidth: "85%",
//           display: "flex",
//           margin: "2rem auto",
//           padding: "1rem",
//           background: "transparent",


//         }}
//       >
//         {/* My Profile Section */}
//         <div className='my-profile-section'>
//           <div>
//             <img
//               className='profile-dp'
//               src={user.profilePic ? `http://localhost:5000${user.profilePic}` : '/default-avatar.jpg'}
//               alt={`${user.name}'s profile`}
//               onError={e => {
//                 e.target.onerror = null;
//                 e.target.src = '/default-avatar.jpg';
//               }}
//             />

//             <Link to={`/profile/${user._id}`}>
//               <div className='btn-my-profile'>
//                 <span>{user.name}</span>
//                 <small style={{ fontSize: '0.8rem', opacity: 0.7, color: 'white' }}>
//                   {user.college?.name || 'College not specified'}
//                 </small>
//               </div>
//             </Link>

//             <Link to="/edit-profile" style={{ marginRight: '1rem', textDecoration: 'none' }}>
//               <button className='btn-profile'>Edit Profile</button>
//             </Link>

//             <Link to="/friend-requests" style={{ textDecoration: "none" }}>
//               <button className='btn-profile2'>
//                 Friend Requests ({receivedRequestsCount})
//               </button>
//             </Link>



//           </div>
//           {/* peer-section */}
//           <div className='peer-section'>
//             <h2>Your Peers</h2>
//             {msg && <p style={{ color: '#65cd61' }}>{msg}</p>}
//             {loading ? (
//               <p>Loading...</p>
//             ) : (
//               <ul style={{ listStyle: "none", padding: 0 }}>
//                 {users.length === 0 && <li>No other students found.</li>}
//                 {users.map(u => (
//                   <li key={u._id} className='peer-list-items' style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
//                     {/* Profile Picture with fallback to default avatar */}
//                     <img
//                       src={u.profilePic ? `http://localhost:5000${u.profilePic}` : '/default-avatar.jpg'}
//                       alt={`${u.name}'s profile`}
//                       style={{
//                         width: "40px",
//                         height: "40px",
//                         borderRadius: "50%",
//                         objectFit: "cover"
//                       }}
//                       onError={(e) => { e.target.onerror = null; e.target.src = '/default-avatar.jpg'; }}
//                     />


//                     {/* User Name link */}
//                     <Link
//                       to={`/profile/${u._id}`}
//                       style={{ textDecoration: 'none', color: 'white', fontWeight: '500' }}
//                       title={`View ${u.name}'s profile`}
//                     >
//                       {u.name}
//                     </Link>

//                     {/* Friend request buttons */}

//                     <div>
//                       {isAlreadyFriend(u._id) ? (
//                       <button disabled className='btn-friends'>Friends</button>
//                     ) : isRequestSent(u._id) ? (
//                       <button disabled className='btn-peer-req'>Request Sent</button>
//                     ) : (
//                       <button
//                         className='btn-add-friend'
//                         onClick={() => sendFriendRequest(u._id)}
//                       >
//                         Add Friend
//                       </button>
//                     )}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//         </div>

//         {/* feed Section */}
//         <div >
//           <div className="college-feed" style={{ maxWidth: "100%", padding: "1rem", borderRadius: 8 }}>
//             <h2 style={{ color: "white" }}>See what's up <span style={{ color: "#a4a0a0" }}>@</span><small style={{ opacity: 0.7, color: '#F79B72', fontSize: '20px' }}>
//               {user.college?.name || 'College not specified'}
//             </small>{" "}</h2>

//             <div className="feed-section" >
//               <div className="feed-container">
//                 <div className='post' >
//                   <PostsList posts={collegePosts} />
//                 </div>
//                 {/* <div className='achievement'>
//                   <AchievementsList achievements={collegeAchievements} />
//                 </div> */}
//               </div>

//             </div>
//           </div>
//         </div>

//       </div>



//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Header from './Header';
import './Dashboard.css';
import AchievementsList from './AchievementsList';
import PostsList from './PostsList';
import Nav from './Nav';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState('');
  const [friendRequestsSent, setFriendRequestsSent] = useState([]);
  const [friends, setFriends] = useState([]);
  const [receivedRequestsCount, setReceivedRequestsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // College-wide posts & achievements
  const [collegePosts, setCollegePosts] = useState([]);
  const [collegeAchievements, setCollegeAchievements] = useState([]);

  const navigate = useNavigate();

  // Fetch all users from the same college except current user
  useEffect(() => {
    if (!user) return;

    const fetchCollegeUsers = async () => {
      setLoading(true);
      setMsg('');
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/college`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setUsers(res.data.filter(u => u._id !== user._id));
      } catch {
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
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setFriendRequestsSent(res.data.friendRequestsSent || []);
        setFriends(res.data.friends || []);
      } catch {
        // ignore
      }
    };

    fetchUserRelationships();
  }, [user]);

  // Fetch count of received friend requests
  useEffect(() => {
    if (!user) return;

    const fetchReceivedRequestsCount = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/friend-requests`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setReceivedRequestsCount(res.data.length);
      } catch {
        setReceivedRequestsCount(0);
      }
    };

    fetchReceivedRequestsCount();
  }, [user]);

  // Fetch college posts and achievements
  useEffect(() => {
    if (!user) return;

    const fetchCollegeFeed = async () => {
      try {
        const [postsRes, achieRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/posts/college`, {
            headers: { Authorization: `Bearer ${user.token}` }
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/api/achievements/college`, {
            headers: { Authorization: `Bearer ${user.token}` }
          })
        ]);
        setCollegePosts(postsRes.data || []);
        setCollegeAchievements(achieRes.data || []);
      } catch (err) {
        console.error("Error loading college feed:", err);
      }
    };

    fetchCollegeFeed();
  }, [user]);

  // Handle sending friend request
  const sendFriendRequest = async (receiverId) => {
    setMsg('');
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/friend-request/send`,
        { receiverId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setMsg('Friend request sent!');
      setFriendRequestsSent(prev => [...prev, receiverId]);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Failed to send friend request");
    }
  };

  const isRequestSent = (userId) => {
    return friendRequestsSent.some(id => {
      if (typeof id === 'string') return id === userId;
      return id._id === userId;
    });
  };

  const isAlreadyFriend = (userId) => {
    return friends.some(f => {
      if (typeof f === 'string') return f === userId;
      return f._id === userId;
    });
  };

  return (
    <div className='main-dash'>
      <Header />
      <h3 style={{ color: 'white', margin: "10px 180px" }}>
        Welcome to,{" "}
        <small style={{ opacity: 0.7, color: '#F79B72', fontSize: '20px' }}>
          {user.college?.name || 'College not specified'}
        </small>{" "}
        Community
      </h3>

      <div
        className="dashboard"
        style={{
          maxWidth: "85%",
          display: "flex",
          margin: "2rem auto",
          padding: "1rem",
          background: "transparent",
        }}
      >
        {/* My Profile Section */}
        <div className='my-profile-section'>
          <div className='edit-prof'>
            <img
              className='profile-dp'
              src={user.profilePic || '/default-avatar.jpg'}
              alt={`${user.name}'s profile`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default-avatar.jpg';
              }}
            />

            <Link to={`/profile/${user._id}`}>
              <div className='btn-my-profile'>
                <span>{user.name}</span>
                <small style={{ fontSize: '0.8rem', opacity: 0.7, color: 'white' }}>
                  {user.college?.name || 'College not specified'}
                </small>
              </div>
            </Link>

            <Link to="/edit-profile" style={{ marginRight: '1rem', textDecoration: 'none' }}>
              <button className='btn-profile'>Edit Profile</button>
            </Link>

            <Link to="/friend-requests" style={{ textDecoration: "none" }}>
              <button className='btn-profile2'>
                Friend Requests ({receivedRequestsCount})
              </button>
            </Link>
          </div>

          {/* Peer Section */}
          <div className='peer-section'>
            <h2>Your Peers</h2>
            {msg && <p style={{ color: '#65cd61' }}>{msg}</p>}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {users.length === 0 && <li>No other students found.</li>}
                {users.map(u => (
                  <li
                    key={u._id}
                    className='peer-list-items'
                    style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}
                  >
                    {/* Profile Picture with fallback */}
                    <img
                      src={u.profilePic || '/default-avatar.jpg'}
                      alt={`${u.name}'s profile`}
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

                    {/* User Name link */}
                    <Link
                      to={`/profile/${u._id}`}
                      style={{ textDecoration: 'none', color: 'white', fontWeight: '500' }}
                      title={`View ${u.name}'s profile`}
                    >
                      {u.name}
                    </Link>

                    {/* Friend request buttons */}
                    <div>
                      {isAlreadyFriend(u._id) ? (
                        <button disabled className='btn-friends'>Friends</button>
                      ) : isRequestSent(u._id) ? (
                        <button disabled className='btn-peer-req'>Request Sent</button>
                      ) : (
                        <button
                          className='btn-add-friend'
                          onClick={() => sendFriendRequest(u._id)}
                        >
                          Add Friend
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Feed Section */}
        <div>
          <div className="college-feed" style={{ maxWidth: "100%", padding: "1rem", borderRadius: 8 }}>
            <h2 style={{ color: "white" }}>
              See what's up <span style={{ color: "#a4a0a0" }}>@</span>
              <small style={{ opacity: 0.7, color: '#F79B72', fontSize: '20px' }}>
                {user.college?.name || 'College not specified'}
              </small>{" "}
            </h2>

            <div className="feed-section">
              <div className="feed-container">
                <div className='post'>
                  <PostsList posts={collegePosts} />
                </div>
                {/* Achievements list can be shown here if needed */}
                {/* <div className='achievement'>
                  <AchievementsList achievements={collegeAchievements} />
                </div> */}
              </div>
            </div>
          </div>
        </div>

      </div>
      <Nav/>
    </div>
  );
};

export default Dashboard;


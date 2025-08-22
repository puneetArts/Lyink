// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';
// import { AuthContext } from '../contexts/AuthContext';
// import './ProfileView.css';  // in ProfileView.js
// import Header from './Header';
// import AchievementsList from './AchievementsList';
// import PostsList from './PostsList';
// import { LiaCertificateSolid } from "react-icons/lia";
// const ProfileView = () => {
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);

//   const [profile, setProfile] = useState(null);
//   const [msg, setMsg] = useState('');

//   // NEW: state for achievements & posts
//   const [achievements, setAchievements] = useState([]);
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     if (!user) return;

//     // Fetch profile info
//     axios.get(`http://localhost:5000/api/users/${id}`, {
//       headers: { Authorization: `Bearer ${user.token}` }
//     })
//       .then(res => setProfile(res.data))
//       .catch(() => setMsg('Failed to load profile'));

//     // Fetch achievements for this user
//     axios.get(`http://localhost:5000/api/achievements/user/${id}`, {
//       headers: { Authorization: `Bearer ${user.token}` }
//     })
//       .then(res => setAchievements(res.data))
//       .catch(err => console.error('Achievements fetch error:', err));

//     // Fetch posts for this user
//     axios.get(`http://localhost:5000/api/posts/user/${id}`, {
//       headers: { Authorization: `Bearer ${user.token}` }
//     })
//       .then(res => setPosts(res.data))
//       .catch(err => console.error('Posts fetch error:', err));

//   }, [id, user]);

//   if (msg) return <p>{msg}</p>;
//   if (!profile) return <p>Loading...</p>;

//   return (
//     <div>
//       <Header />
//       <div className='profile-achieve'>
//         <div
//           className="profile-view"
//           style={{
//             maxWidth: 500,
//             margin: '2rem auto',
//             padding: '1rem',
//             background: '#fff',
//             borderRadius: "0.3rem"
//           }}
//         >
//           <h2>{profile.name}</h2>

//           <div className='pic-bio'>
//             <img
//               src={profile.profilePic ? `http://localhost:5000${profile.profilePic}` : '/default-avatar.jpg'}
//               alt="Profile"
//               style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover' }}
//               onError={e => {
//                 e.target.onerror = null;  // Prevent infinite fallback loop
//                 e.target.src = '/default-avatar.jpg';  // Fallback image path
//               }}
//             />
//             <div className='bio'><p >{profile.bio}</p></div>
//           </div>

//           <p><b>Email:</b> {profile.email}</p>
//           <p><b>College:</b> {profile.college?.name}</p>
//           <p><b>Major:</b> {profile.major || 'N/A'}</p>
//           <p><b>Batch:</b> {profile.year || 'N/A'}</p>
//           <p><b>Interests:</b> {profile.interests && profile.interests.length ? profile.interests.join(', ') : 'N/A'}</p>

//           {/* Link to your own profile edit if viewing self */}
//           {profile && user && profile._id.toString() === user._id.toString() && (
//             <Link to="/edit-profile">Edit Profile</Link>
//           )}


//         </div>



//       </div>

//       <div className='achieve-post'>

//         <div className="post-view">
//           <h2>Posts</h2>
//           {/* Posts Section */}
//           <PostsList posts={posts} />
//         </div>
//         <div className="achievment-view">
//           <h2><span><LiaCertificateSolid className='icon' /></span></h2>
//           {/* Achievements Section */}
//           <AchievementsList achievements={achievements} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileView;
//new

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './ProfileView.css';
import Header from './Header';
import AchievementsList from './AchievementsList';
import PostsList from './PostsList';
import { LiaCertificateSolid } from "react-icons/lia";

const ProfileView = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [msg, setMsg] = useState('');

  // NEW: state for achievements & posts
  const [achievements, setAchievements] = useState([]);
  const [posts, setPosts] = useState([]);
  const [resumes, setResumes] = useState([]);


  useEffect(() => {
    if (!user) return;

    // Fetch profile info
    axios.get(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => setProfile(res.data))
      .catch(() => setMsg('Failed to load profile'));

    // Fetch achievements for this user
    axios.get(`${import.meta.env.VITE_API_URL}/api/achievements/user/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => setAchievements(res.data))
      .catch(err => console.error('Achievements fetch error:', err));

    // Fetch posts for this user
    axios.get(`${import.meta.env.VITE_API_URL}/api/posts/user/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => setPosts(res.data))
      .catch(err => console.error('Posts fetch error:', err));

       axios.get(`${import.meta.env.VITE_API_URL}/api/resumes/user/${id}`, {
    headers: { Authorization: `Bearer ${user.token}` }
  })
    .then(res => setResumes(res.data))
    .catch(err => console.error('Resumes fetch error:', err));

  }, [id, user]);
  


  if (msg) return <p>{msg}</p>;
  if (!profile) return <div style={{display: "flex", marginTop:"350px", alignItems:"center", justifyContent:"center"}}><p>Loading...</p></div>;

  return (
    <div>
      <Header />
      <div className='profile-achieve'>
        <div
          className="profile-view"
          style={{
            maxWidth: 500,
            margin: '2rem auto',
            padding: '1rem',
            background: '#fff',
            borderRadius: "0.3rem"
          }}
        >
          <h2>{profile.name}</h2>

          <div className='pic-bio'>
            <img
              src={profile.profilePic || '/default-avatar.jpg'}
              alt="Profile"
              style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                objectFit: 'cover'
              }}
              onError={e => {
                e.target.onerror = null;
                e.target.src = '/default-avatar.jpg';
              }}
            />
            <div className='bio'><p>{profile.bio}</p></div>
          </div>

          <p><b>Email:</b> {profile.email}</p>
          <p><b>College:</b> {profile.college?.name}</p>
          <p><b>Major:</b> {profile.major || 'N/A'}</p>
          <p><b>Batch:</b> {profile.year || 'N/A'}</p>
          <p><b>Interests:</b> {profile.interests && profile.interests.length
            ? profile.interests.join(', ')
            : 'N/A'}
          </p>

          {/* Link to your own profile edit if viewing self */}
          {profile && user && profile._id.toString() === user._id.toString() && (
            <Link to="/edit-profile">Edit Profile</Link>
          )}
        </div>
      </div>
      {/* <div className='resume'>
        <ResumeList resume={resumes} />
      </div> */}
      <div className='achieve-post'>
        <div className="post-view">
          <h2>Posts</h2>
          {/* Posts Section */}
          <PostsList posts={posts} />
        </div>

        <div className="achievment-view">
          <h2><span><LiaCertificateSolid className='icon' /></span></h2>
          {/* Achievements Section */}
          <AchievementsList achievements={achievements} />
        </div>
      </div>
    </div>
  );
};

export default ProfileView;

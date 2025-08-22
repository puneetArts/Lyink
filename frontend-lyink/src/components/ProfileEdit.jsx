// // import React, { useEffect, useState, useContext } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import { AuthContext } from '../contexts/AuthContext';
// // import Header from './Header';
// // import './ProfileEdit.css';
// // import AchievementForm from './AchievementForm';
// // import PostForm from './PostForm';
// // import AchievementsList from './AchievementsList';
// // import PostsList from './PostsList';

// // const ProfileEdit = () => {
// //   const { user, login, logout } = useContext(AuthContext);
// //   const navigate = useNavigate();

// //   const [form, setForm] = useState({
// //     name: '',
// //     bio: '',
// //     major: '',
// //     year: '',
// //     interests: '',
// //     profilePic: ''
// //   });
// //   const [msg, setMsg] = useState('');
// //   const [profilePicFile, setProfilePicFile] = useState(null);
// //   const [profilePicPreview, setProfilePicPreview] = useState('');

// //   // Load current user data on mount
// //   useEffect(() => {
// //     if (!user) return;

// //     axios.get('http://localhost:5000/api/users/me', {
// //       headers: { Authorization: `Bearer ${user.token}` }
// //     })
// //       .then(res => {
// //         const { name, bio, major, year, interests, profilePic } = res.data;
// //         setForm({
// //           name: name || '',
// //           bio: bio || '',
// //           major: major || '',
// //           year: year || '',
// //           interests: interests ? interests.join(', ') : '',
// //           profilePic: profilePic || ''
// //         });
// //         setProfilePicPreview(profilePic ? `http://localhost:5000${profilePic}` : '');
// //       })
// //       .catch(() => setMsg('Failed to load profile data'));
// //   }, [user]);

// //   // Handle field changes
// //   const handleChange = e => {
// //     const { name, value } = e.target;
// //     setForm(prev => ({ ...prev, [name]: value }));
// //   };

// //   // Handle profile photo file input change, create a preview URL
// //   const handleProfilePicChange = e => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setProfilePicFile(file);
// //       setProfilePicPreview(URL.createObjectURL(file));
// //     }
// //   };

// //   // Handle form submission, send multipart/form-data if photo uploaded
// //   const handleSubmit = async e => {
// //     e.preventDefault();
// //     setMsg('');

// //     try {
// //       const formData = new FormData();
// //       formData.append('name', form.name);
// //       formData.append('bio', form.bio);
// //       formData.append('major', form.major);
// //       formData.append('year', form.year);
// //       formData.append('interests', form.interests.split(',').map(i => i.trim()).filter(i => i));
// //       if (profilePicFile) {
// //         formData.append('profilePic', profilePicFile);
// //       } else if (form.profilePic) {
// //         // If just a URL or existing path (optional, depending on backend handling)
// //         formData.append('profilePic', form.profilePic);
// //       }

// //       const res = await axios.put('http://localhost:5000/api/users/me', formData, {
// //         headers: {
// //           Authorization: `Bearer ${user.token}`,
// //           'Content-Type': 'multipart/form-data'
// //         }
// //       });

// //       setMsg('Profile updated successfully');

// //       // Optionally update AuthContext user info by re-login or updating state
// //       login(user.token);

// //       // Redirect or refresh profile page
// //       navigate(`/profile/${user._id}`);
// //     } catch (err) {
// //       setMsg(err.response?.data?.msg || 'Update failed');
// //     }
// //   };

// //   const handleLogout = () => {
// //     logout();
// //     navigate('/login');
// //   };

// //   return (
// //     <div>
// //       <Header />
// //       <div className="profile-edit-container">
// //         <h2>Edit Profile</h2>
// //         {msg && <p className="message">{msg}</p>}

// //         <form onSubmit={handleSubmit} encType="multipart/form-data" className="profile-edit-form">
// //           <label>Name:</label>
// //           <input name="name" value={form.name} onChange={handleChange} required />

// //           <label>Bio:</label>
// //           <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} />

// //           <label>Major:</label>
// //           <input name="major" value={form.major} onChange={handleChange} />

// //           <label>Batch:</label>
// //           <input name="year" value={form.year} onChange={handleChange} />

// //           <label>Interests (comma separated):</label>
// //           <input name="interests" value={form.interests} onChange={handleChange} />

// //           <label>Profile Picture:</label>
// //           <input type="file" accept="image/*" onChange={handleProfilePicChange} />
// //           {profilePicPreview && (
// //             <div className="profile-pic-preview">
// //               <img
// //                 src={profilePicPreview}
// //                 alt="Profile preview"
// //               />
// //             </div>
// //           )}

// //           <button type="submit" className="btn-save">Save</button>
// //         </form>

// //         <button onClick={handleLogout} className="btn-logout">Logout</button>
// //       </div>
// //       <div className="profile-edit-container2">
// //        <div className="profile-edit-container"> <AchievementForm onAdded={a => console.log('Added', a)} /></div>
// //       <div className="profile-edit-container"><PostForm onAdded={p => console.log('Added', p)} /></div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProfileEdit;


// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../contexts/AuthContext';
// import Header from './Header';
// import './ProfileEdit.css';
// import AchievementForm from './AchievementForm';
// import PostForm from './PostForm';
// import AchievementsList from './AchievementsList';
// import PostsList from './PostsList';

// const ProfileEdit = () => {
//   const { user, login, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: '',
//     bio: '',
//     major: '',
//     year: '',
//     interests: '',
//     profilePic: ''
//   });
//   const [msg, setMsg] = useState('');
//   const [profilePicFile, setProfilePicFile] = useState(null);
//   const [profilePicPreview, setProfilePicPreview] = useState('');

//   // Load current user data on mount
//   useEffect(() => {
//     if (!user) return;

//     axios.get('http://localhost:5000/api/users/me', {
//       headers: { Authorization: `Bearer ${user.token}` }
//     })
//       .then(res => {
//         const { name, bio, major, year, interests, profilePic } = res.data;
//         setForm({
//           name: name || '',
//           bio: bio || '',
//           major: major || '',
//           year: year || '',
//           interests: interests ? interests.join(', ') : '',
//           profilePic: profilePic || ''
//         });
//         // Use Cloudinary URL directly from backend or empty string
//         setProfilePicPreview(profilePic || '');
//       })
//       .catch(() => setMsg('Failed to load profile data'));
//   }, [user]);

//   // Handle field changes
//   const handleChange = e => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   // Handle profile photo file input change, create a preview URL
//   const handleProfilePicChange = e => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfilePicFile(file);
//       setProfilePicPreview(URL.createObjectURL(file));
//     }
//   };

//   // Handle form submission, send multipart/form-data with image file if selected
//   const handleSubmit = async e => {
//     e.preventDefault();
//     setMsg('');

//     try {
//       const formData = new FormData();
//       formData.append('name', form.name);
//       formData.append('bio', form.bio);
//       formData.append('major', form.major);
//       formData.append('year', form.year);
//       formData.append('interests', form.interests.split(',').map(i => i.trim()).filter(i => i));

//       // Append image file only if a new one is selected
//       if (profilePicFile) {
//         formData.append('profilePic', profilePicFile);
//       }

//       const res = await axios.put('http://localhost:5000/api/users/me', formData, {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       setMsg('Profile updated successfully');

//       // Optionally update AuthContext user info by re-login or updating state
//       login(user.token);

//       // Redirect or refresh profile page
//       navigate(`/profile/${user._id}`);
//     } catch (err) {
//       setMsg(err.response?.data?.msg || 'Update failed');
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div>
//       <Header />
//       <div className="profile-edit-container">
//         <h2>Edit Profile</h2>
//         {msg && <p className="message">{msg}</p>}

//         <form onSubmit={handleSubmit} encType="multipart/form-data" className="profile-edit-form">
//           <label>Name:</label>
//           <input name="name" value={form.name} onChange={handleChange} required />

//           <label>Bio:</label>
//           <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} />

//           <label>Major:</label>
//           <input name="major" value={form.major} onChange={handleChange} />

//           <label>Batch:</label>
//           <input name="year" value={form.year} onChange={handleChange} />

//           <label>Interests (comma separated):</label>
//           <input name="interests" value={form.interests} onChange={handleChange} />

//           <label>Profile Picture:</label>
//           <input type="file" accept="image/*" onChange={handleProfilePicChange} />
//           {profilePicPreview && (
//             <div className="profile-pic-preview">
//               <img
//                 src={profilePicPreview}
//                 alt="Profile preview"
//                 style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover' }}
//                 onError={e => {
//                   e.target.onerror = null; // prevent infinite loop
//                   e.target.src = '/default-avatar.jpg'; // fallback image in public folder
//                 }}
//               />
//             </div>
//           )}
//           {/* Show default avatar when no preview */}
//           {!profilePicPreview && (
//             <div className="profile-pic-preview">
//               <img
//                 src="/default-avatar.jpg"
//                 alt="Default avatar"
//                 style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover' }}
//               />
//             </div>
//           )}

//           <button type="submit" className="btn-save">Save</button>
//         </form>

//         <button onClick={handleLogout} className="btn-logout">Logout</button>
//       </div>
//       <div className="profile-edit-container2">
//         <div className="profile-edit-container">
//           <AchievementForm onAdded={a => console.log('Added', a)} />
//         </div>
//         <div className="profile-edit-container">
//           <PostForm onAdded={p => console.log('Added', p)} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileEdit;


import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Header from './Header';
import './ProfileEdit.css';
import AchievementForm from './AchievementForm';
import PostForm from './PostForm';

// import ResumeList from './ResumeList';
// import ResumeUpload from './ResumeUpload';

const ProfileEdit = () => {
  const { user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    bio: '',
    major: '',
    year: '',
    interests: '',
    profilePic: ''
  });
  const [msg, setMsg] = useState('');
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState('');

  // Load current user data on mount
  useEffect(() => {
    if (!user) return;

    axios.get(`${import.meta.env.VITE_API_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => {
        const { name, bio, major, year, interests, profilePic } = res.data;
        setForm({
          name: name || '',
          bio: bio || '',
          major: major || '',
          year: year || '',
          interests: interests ? interests.join(', ') : '',
          profilePic: profilePic || ''
        });
        // Use Cloudinary URL directly from backend or empty string
        setProfilePicPreview(profilePic || '');
      })
      .catch(() => setMsg('Failed to load profile data'));
  }, [user]);

  // Handle field changes
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle profile photo file input change, create a preview URL
  const handleProfilePicChange = e => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission, send multipart/form-data with image file if selected
  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('bio', form.bio);
      formData.append('major', form.major);
      formData.append('year', form.year);
      formData.append('interests', form.interests.split(',').map(i => i.trim()).filter(i => i));

      // Append image file only if a new one is selected
      if (profilePicFile) {
        formData.append('profilePic', profilePicFile);
      }

      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/me`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setMsg('Profile updated successfully');

      // Optionally update AuthContext user info by re-login or updating state
      login(user.token);

      // Redirect or refresh profile page
      navigate(`/profile/${user._id}`);
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Update failed');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <Header />
      <div className="profile-edit-container">
        <h2>Edit Profile</h2>
        {msg && <p className="message">{msg}</p>}

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="profile-edit-form">
          <label>Name:</label>
          <input name="name" value={form.name} onChange={handleChange} required />

          <label>Bio:</label>
          <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} />

          <label>Major:</label>
          <input name="major" value={form.major} onChange={handleChange} />

          <label>Batch:</label>
          <input name="year" value={form.year} onChange={handleChange} />

          <label>Interests (comma separated):</label>
          <input name="interests" value={form.interests} onChange={handleChange} />

          <label>Profile Picture:</label>
          <input type="file" accept="image/*" onChange={handleProfilePicChange} />
          {profilePicPreview ? (
            <div className="profile-pic-preview">
              <img
                src={profilePicPreview}
                alt="Profile preview"
                style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover' }}
                onError={e => {
                  e.target.onerror = null; // prevent infinite loop
                  e.target.src = '/default-avatar.jpg'; // fallback image in public folder
                }}
              />
            </div>
          ) : (
            <div className="profile-pic-preview">
              <img
                src="/default-avatar.jpg"
                alt="Default avatar"
                style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover' }}
              />
            </div>
          )}

          <button type="submit" className="btn-save">Save</button>
        </form>

        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>
      {/* <div className='resume-container'>
        <ResumeUpload onAdded={r => console.log('Added', r)} />
      </div>  */}
      <div className="profile-edit-container2">
        <div className="profile-edit-container">
          <AchievementForm onAdded={a => console.log('Added', a)} />
        </div>
        <div className="profile-edit-container">
          <PostForm onAdded={p => console.log('Added', p)} />
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;

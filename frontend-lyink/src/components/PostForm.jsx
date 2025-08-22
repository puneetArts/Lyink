// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../contexts/AuthContext';

// const PostForm = ({ onAdded }) => {
//   const { user } = useContext(AuthContext);
//   const [content, setContent] = useState('');
//   const [imageFile, setImageFile] = useState(null);
//   const [msg, setMsg] = useState('');

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setMsg('');

//     try {
//       const formData = new FormData();
//       formData.append('content', content);
//       if (imageFile) {
//         formData.append('image', imageFile);
//       }

//       const res = await axios.post('http://localhost:5000/api/posts', formData, {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       setMsg('Post created!');
//       setContent('');
//       setImageFile(null);
//       if (onAdded) onAdded(res.data.post);
//     } catch (err) {
//       setMsg(err.response?.data?.msg || 'Error creating post');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
//       <h4>Create Post</h4>
//       {msg && <p>{msg}</p>}
//       <textarea style={{width: "400px", height: "150px", padding:"1rem",borderRadius:"0.3rem"}} value={content} onChange={e => setContent(e.target.value)} placeholder="What's on your mind?" required />
//       <input type="file" onChange={e => setImageFile(e.target.files[0])} />
//       <button type="submit">Post</button>
//     </form>
//   );
// };

// export default PostForm;


import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const PostForm = ({ onAdded }) => {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');

    try {
      const formData = new FormData();
      formData.append('content', content);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/posts`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setMsg('Post created!');
      setContent('');
      setImageFile(null);

      if (onAdded) onAdded(res.data.post);

    } catch (err) {
      setMsg(err.response?.data?.msg || 'Error creating post');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <h4>Create Post</h4>
      {msg && <p>{msg}</p>}

      <textarea
        style={{
          width: "400px",
          height: "150px",
          padding: "1rem",
          borderRadius: "0.3rem"
        }}
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="What's on your mind?"
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={e => setImageFile(e.target.files[0])}
      />

      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;

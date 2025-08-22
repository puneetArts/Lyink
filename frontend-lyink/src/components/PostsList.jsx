// import React from 'react';
// import './PostList.css'
// import { Link } from 'react-router-dom';

// const PostsList = ({ posts }) => {
//   if (!posts.length) return <p style={{ color:"white"}}>No posts yet.</p>;

//   return (
//    <div className='post-list'>
//   {/* <h2>Posts</h2> */}
//   {posts.map(p => (
//     <div
//       key={p._id}
//       style={{ borderBottom: '1px solid #ddd', padding: '0.5rem 0', marginBottom: "40px", justifyContent: "center" }}
//     >
//       {p.user && (
//         <p className='post-text' style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//           {/* User profile picture */}
//           <img
//             src={p.user.profilePic ? `http://localhost:5000${p.user.profilePic}` : '/default-avatar.jpg'}
//             alt={`${p.user.name}'s profile`}
//             style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover' }}
//             onError={(e) => { e.target.onerror = null; e.target.src = '/default-avatar.jpg'; }}
//           />
          
//           <Link
//             className='post-user'
//             to={`/profile/${p.user._id}`}
//             title={`View ${p.user.name}'s profile`}
//             style={{ textDecoration: 'none', color: '#F79B72' }}
//           >
//             {p.user.name}
//           </Link>
//         </p>
//       )}
//       <p className='post-text'>{p.content}</p>
//       {p.image && (
//         <img
//           src={`http://localhost:5000${p.image}`}
//           alt="Post"
//           style={{ maxWidth: '500px', marginBottom: "30px" }}
//         />
//       )}
//     </div>
//   ))}
// </div>

//   );
// };

// export default PostsList;


import React from 'react';
import './PostList.css';
import { Link } from 'react-router-dom';

const PostsList = ({ posts }) => {
  if (!posts.length) return <p style={{ color: "white" }}>No posts yet.</p>;

  return (
    <div className='post-list'>
      {posts.map(p => (
        <div
          key={p._id}
          style={{
            borderBottom: '1px solid #ddd',
            padding: '0.5rem 0',
            marginBottom: "40px",
            justifyContent: "center"
          }}
        >
          {p.user && (
            <p className='post-text' style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* User profile picture with Cloudinary URL or default */}
              <img
                src={p.user.profilePic || '/default-avatar.jpg'}
                alt={`${p.user.name}'s profile`}
                style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/default-avatar.jpg';
                }}
              />

              <Link
                className='post-user'
                to={`/profile/${p.user._id}`}
                title={`View ${p.user.name}'s profile`}
                style={{ textDecoration: 'none', color: '#F79B72' }}
              >
                {p.user.name}
              </Link>
            </p>
          )}

          {/* Post text */}
          <p className='post-text'>{p.content}</p>

          {/* Post image (Cloudinary URL) */}
          {p.image && (
            <img
              src={p.image}
              alt="Post"
              style={{ maxWidth: '500px', marginBottom: "30px" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default-image.jpg'; // optional placeholder
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default PostsList;

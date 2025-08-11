import React from 'react';
import './PostList.css'
import { Link } from 'react-router-dom';

const PostsList = ({ posts }) => {
  if (!posts.length) return <p style={{ color:"white"}}>No posts yet.</p>;

  return (
    <div className='post-list'>
      <h2>Posts</h2>
      {posts.map(p => (
        <div key={p._id} style={{ borderBottom: '1px solid #ddd', padding: '0.5rem 0',marginBottom:"40px" }}>
          <p className='post-text'>{p.content}</p>
          {p.image && <img src={`http://localhost:5000${p.image}`} alt="Post" style={{ maxWidth: '500px' }} />}
          {p.user && (
            <p className='post-text'>
              by{' '}
              <Link className='post-user'
                to={`/profile/${p.user._id}`}
                
                title={`View ${p.user.name}'s profile`}
              >
                {p.user.name}
              </Link>
            </p>
          )}

        </div>
      ))}
    </div>
  );
};

export default PostsList;

import React from 'react';
import './AchievementList.css'

import { Link } from 'react-router-dom';

const AchievementsList = ({ achievements }) => {
  if (!achievements.length) return <p style={{ color:"white"}}>No achievements yet.</p>;

  return (
    <div className='achievement-list'>
      {/* <h2 >Achievements</h2> */}
      {achievements.map(a => (
        <div key={a._id} className='achievements' >
          
          <div className='content' style={{width:"400px", }}>
            <small style={{color:"#a4a0a0"}}>
            {a.date ? new Date(a.date).toLocaleDateString() : ''}
          </small><br/><strong style={{ marginBottom: "10px", color: "white" }}>{a.title} </strong >
          {/* <p style={{ marginBottom: "10px", color: "white" }}>{a.description}</p> */}
          <br/>
          {a.user && (
            <small>
              
              <Link
                to={`/profile/${a.user._id}`}
                style={{ color: '#F79B72', textDecoration: 'none' }}
                title={`View ${a.user.name}'s profile`}
              >
                {a.user.name}
              </Link>
            </small>
          )}
          </div>
          <div style={{marginLeft:"4rem"}}><img
  src={a.certificate}
  alt="Certificate"
  style={{ maxWidth: '100px', maxHeight: '100px' }}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = '/default-certificate.jpg'; // fallback in /public
  }}
/></div>
          
          <br/>
          
        </div>
      ))}
    </div>
  );
};

export default AchievementsList;

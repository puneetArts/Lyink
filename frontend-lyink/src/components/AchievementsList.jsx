import React from 'react';
import './AchievementList.css'
import { LiaCertificateSolid } from "react-icons/lia";

const AchievementsList = ({ achievements }) => {
  if (!achievements.length) return <p style={{ color:"white"}}>No achievements yet.</p>;

  return (
    <div className='achievement-list'>
      <h2 >Achievements</h2>
      {achievements.map(a => (
        <div key={a._id} className='achievements' >
          <LiaCertificateSolid className='icon' /><strong style={{ marginBottom: "10px", color: "white" }}>{a.title} </strong >
          <p style={{ marginBottom: "10px", color: "white" }}>{a.description}</p>
          {a.certificate && <img src={`http://localhost:5000${a.certificate}`} alt="Certificate" style={{ maxWidth: '300px' }} />}
          <small>by {a.user?.name}</small><br/>
          <small style={{color:"#a4a0a0"}}>
            {a.date ? new Date(a.date).toLocaleDateString() : ''}
          </small>
        </div>
      ))}
    </div>
  );
};

export default AchievementsList;

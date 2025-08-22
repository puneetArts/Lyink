// // src/components/Header.js
// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../contexts/AuthContext';
// import './Header.css'; // import styling
// import { LiaUserFriendsSolid } from "react-icons/lia";
// import { GoHome } from "react-icons/go";
// import { HiOutlineUserCircle } from "react-icons/hi2";

// const Header = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   if (!user) return null; // don't render header if not logged in

//   return (
//     <header className="app-header">
//       <div className="header-container">
//         {/* Left Logo/Brand */}
//         <div className="header-logo">
//           <Link to="/dashboard">LynxHub</Link>
//         </div>

//         {/* Center Navigation Links */}
//         <nav className="header-nav">
//           <Link to="/dashboard"><GoHome className='icon3'/></Link>
//           <Link to="/friends"><LiaUserFriendsSolid className='icon2'/></Link>

//           {user && (
//           <Link
//             to={`/profile/${user._id}`}
//             style={{
//               color: 'white',
//               textDecoration: 'none',
//               marginLeft: '1rem'
//             }}
//           >
//             <HiOutlineUserCircle className='icon4'/>
//           </Link>
//         )}
          
//         </nav>

//         {/* Right - User Info and Logout */}
//         <div className="header-right">
//           <span className="header-user">
//             <div>{user.name}</div><small style={{color:"#a4a0a0"}}>{user.email}</small>
//           </span>
//           <button
//             className="btn btn-logout"
//             onClick={() => {
//               logout();
//               navigate('/login');
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


// src/components/Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Header.css';
import { LiaUserFriendsSolid } from "react-icons/lia";
import { GoHome } from "react-icons/go";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null; // don't render header if not logged in

  return (
    <header className="app-header">
      <div className="header-container">

        {/* Left Logo/Brand */}
        <div className="header-logo">
          <Link to="/dashboard">LynxApp</Link>
        </div>

        {/* Center Navigation Links */}
        <nav className="header-nav">
          <Link to="/dashboard"><GoHome className='icon3' /></Link>
          <Link to="/friends"><LiaUserFriendsSolid className='icon2' /></Link>

          {/* User profile link with picture */}
          {user && (
            <Link
              to={`/profile/${user._id}`}
              style={{
                color: 'white',
                textDecoration: 'none',
                marginLeft: '1rem'
              }}
            >
              <img
                src={user.profilePic || '/default-avatar.jpg'}
                alt={`${user.name}'s profile`}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #F79B72"
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/default-avatar.jpg';
                }}
              />
            </Link>
          )}
        </nav>

        {/* Right - User Info and Logout */}
        <div className="header-right">
          <span className="header-user">
            <div>{user.name}</div>
            <small style={{ color: "#a4a0a0" }}>{user.email}</small>
          </span>
          <button
            className="btn btn-logout"
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

// src/components/Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Header.css'; // import styling

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null; // don't render header if not logged in

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Left Logo/Brand */}
        <div className="header-logo">
          <Link to="/dashboard">Lyink</Link>
        </div>

        {/* Center Navigation Links */}
        <nav className="header-nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/friends">Friends</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/achievements">Achievements</Link>
        </nav>

        {/* Right - User Info and Logout */}
        <div className="header-right">
          <span className="header-user">
            {user.name}
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

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="logo-link">
          <h1 className="logo">⚽ SoccerHub</h1>
        </Link>
        
        {/* Search bar is often placed in the Navbar for accessibility */}
        <div className="nav-search">
          <input type="text" placeholder="Search for matches, players..." />
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/create" className="nav-item create-btn-nav">Create Post</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
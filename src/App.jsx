import React from 'react';
import { useRoutes, Link } from 'react-router-dom';
import HomeFeed from './pages/HomeFeed';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import EditPost from './pages/EditPost';
import './App.css';

const App = () => {
  // Define the routes for SoccerHub
  const element = useRoutes([
    {
      path: "/",
      element: <HomeFeed />
    },
    {
      path: "/create",
      element: <CreatePost />
    },
    {
      path: "/post/:id",
      element: <PostDetails />
    },
    {
      path: "/edit/:id",
      element: <EditPost />
    }
  ]);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/" className="logo-link">
            <h1 className="logo">⚽ SoccerHub</h1>
          </Link>
          
          <div className="nav-links">
            <Link to="/" className="nav-item">Pitch Feed</Link>
            <Link to="/create" className="nav-item create-btn-nav">
              + Create Post
            </Link>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {element}
      </main>
    </div>
  );
};

export default App;
import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className="homepage">
      <h1>Baseball Hub</h1>
      <p>Your simple, ad-free source for MLB information</p>
      
      <div className="nav-links">
        <Link to="/standings">
          <button>View Standings</button>
        </Link>
        <Link to="/games">
          <button>Today's Games</button>
        </Link>
        <Link to="/teams">
          <button>Browse Teams</button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
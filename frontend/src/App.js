import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Standings from './pages/Standings';
import Games from './pages/Games';
import Teams from './pages/Teams';
import TeamDetail from './pages/TeamDetail';
import PlayerDetail from './pages/PlayerDetail';
import StadiumDetail from './pages/StadiumDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Favorites from './pages/Favorites';
import PlayerComparison from './pages/PlayerComparison';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/standings">Standings</Link>
          <Link to="/games">Games</Link>
          <Link to="/teams">Teams</Link>
          <Link to="/compare">Compare Players</Link>
          
          <Link to="/favorites">Favorites</Link>
          
          {localStorage.getItem('token') ? (
            <button onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/';
            }}>
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
        
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/games" element={<Games />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:teamId" element={<TeamDetail />} />
          <Route path="/players/:playerId" element={<PlayerDetail />} />
          <Route path="/stadiums/:venueId" element={<StadiumDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/compare" element={<PlayerComparison />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
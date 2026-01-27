import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Standings from './pages/Standings';
import Games from './pages/Games';
import Teams from './pages/Teams';
import TeamDetail from './pages/TeamDetail';
import PlayerDetail from './pages/PlayerDetail';
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
        </nav>
        
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/games" element={<Games />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:teamId" element={<TeamDetail />} />
          <Route path="/players/:playerId" element={<PlayerDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
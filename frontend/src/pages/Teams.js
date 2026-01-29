import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTeams } from '../services/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getTeams();
        const sortedTeams = (data.teams || []).sort((a, b) => 
          a.name.localeCompare(b.name)
        );
        setTeams(sortedTeams);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching teams:', error);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return <div>Loading teams...</div>;
  }

  return (
    <div className="teams">
      <h1>MLB Teams</h1>
      
      <div className="teams-grid">
        {teams.map((team) => (
      <Link to={`/teams/${team.id}`} key={team.id} className="team-card">
      <img 
        src={`https://www.mlbstatic.com/team-logos/${team.id}.svg`}
        alt={team.name}
        style={{width: '80px', height: '80px', marginBottom: '0.5rem'}}
      />
      <h3>{team.name}</h3>
      <p>{team.division.name}</p>
      <p>{team.venue.name}</p>
    </Link>
        ))}
      </div>
    </div>
  );
}

export default Teams;
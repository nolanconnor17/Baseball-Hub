import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTeamById, getTeamRoster, addFavoriteTeam, removeFavoriteTeam } from '../services/api';

function TeamDetail() {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const teamData = await getTeamById(teamId);
        const rosterData = await getTeamRoster(teamId);
        
        setTeam(teamData.teams[0]);
        setRoster(rosterData.roster || []);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching team data:', error);
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [teamId]);

  const handleFavorite = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Please login to add favorites');
      return;
    }

    try {
      if (isFavorite) {
        await removeFavoriteTeam(teamId, token);
        setIsFavorite(false);
      } else {
        await addFavoriteTeam(teamId, token);
        setIsFavorite(true);
      }
    } catch (error) {
      console.log('Error updating favorite:', error);
    }
  };

  if (loading) {
    return <div>Loading team info...</div>;
  }

  if (!team) {
    return <div>Team not found</div>;
  }

  return (
    <div className="team-detail">
       <img 
          src={`https://www.mlbstatic.com/team-logos/${team.id}.svg`}
          alt={team.name}
          style={{width: '100px', height: '100px', marginBottom: '1rem'}}
      />
      <h1>{team.name}</h1>
      <button onClick={handleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      
      <div className="team-info">
        <p><strong>Division:</strong> {team.division.name}</p>
        <p><strong>Venue:</strong> <Link to={`/stadiums/${team.venue.id}`}>{team.venue.name}</Link></p>
        <p><strong>Location:</strong> {team.locationName}</p>
      </div>

      <h2>Roster</h2>
      <div className="roster">
        {roster.map((player) => (
          <Link 
            to={`/players/${player.person.id}`} 
            key={player.person.id}
            className="player-card"
          >
            <div>#{player.jerseyNumber} {player.person.fullName}</div>
            <div>{player.position.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TeamDetail;
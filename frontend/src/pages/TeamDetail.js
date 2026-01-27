import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTeamById, getTeamRoster } from '../services/api';

function TeamDetail() {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading team info...</div>;
  }

  if (!team) {
    return <div>Team not found</div>;
  }

  return (
    <div className="team-detail">
      <h1>{team.name}</h1>
      
      <div className="team-info">
        <p><strong>Division:</strong> {team.division.name}</p>
        <p><strong>Venue:</strong> {team.venue.name}</p>
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
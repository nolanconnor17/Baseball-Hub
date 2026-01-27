import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayerById } from '../services/api';

function PlayerDetail() {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const data = await getPlayerById(playerId);
        setPlayer(data.people[0]);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching player:', error);
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [playerId]);

  if (loading) {
    return <div>Loading player info...</div>;
  }

  if (!player) {
    return <div>Player not found</div>;
  }

  // Get batting or pitching stats if available
  const stats = player.stats?.[0]?.splits?.[0]?.stat;

  return (
    <div className="player-detail">
      <h1>{player.fullName}</h1>
      
      <div className="player-info">
        <p><strong>Position:</strong> {player.primaryPosition?.name}</p>
        <p><strong>Number:</strong> #{player.primaryNumber}</p>
        <p><strong>Team:</strong> {player.currentTeam?.name}</p>
        <p><strong>Age:</strong> {player.currentAge}</p>
        <p><strong>Birth Date:</strong> {player.birthDate}</p>
        <p><strong>Birth Place:</strong> {player.birthCity}, {player.birthStateProvince}</p>
      </div>

      {stats && (
        <div className="player-stats">
          <h2>Season Stats</h2>
          {player.primaryPosition?.abbreviation === 'P' ? (
            // Pitching stats
            <div>
              <p>ERA: {stats.era}</p>
              <p>Wins: {stats.wins}</p>
              <p>Losses: {stats.losses}</p>
              <p>Strikeouts: {stats.strikeOuts}</p>
              <p>Innings Pitched: {stats.inningsPitched}</p>
            </div>
          ) : (
            // Batting stats
            <div>
              <p>AVG: {stats.avg}</p>
              <p>Home Runs: {stats.homeRuns}</p>
              <p>RBI: {stats.rbi}</p>
              <p>Hits: {stats.hits}</p>
              <p>Runs: {stats.runs}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PlayerDetail;
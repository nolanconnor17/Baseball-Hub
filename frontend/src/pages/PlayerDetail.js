import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayerById, addFavoritePlayer, removeFavoritePlayer } from '../services/api';

function PlayerDetail() {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2024');

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        setLoading(true);
        const data = await getPlayerById(playerId, selectedYear);
        console.log('Player data:', data.people[0]);
        setPlayer(data.people[0]);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching player:', error);
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [playerId, selectedYear]);

  const handleFavorite = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Please login to add favorites');
      return;
    }

    try {
      if (isFavorite) {
        await removeFavoritePlayer(playerId, token);
        setIsFavorite(false);
      } else {
        await addFavoritePlayer(playerId, token);
        setIsFavorite(true);
      }
    } catch (error) {
      console.log('Error updating favorite:', error);
    }
  };

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
      <button onClick={handleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      
      <div className="player-info">
        <p><strong>Position:</strong> {player.primaryPosition?.name}</p>
        <p><strong>Number:</strong> #{player.primaryNumber}</p>
        <p><strong>Team:</strong> {player.currentTeam?.name}</p>
        <p><strong>Age:</strong> {player.currentAge}</p>
        <p><strong>Birth Date:</strong> {player.birthDate}</p>
        <p><strong>Birth Place:</strong> {player.birthCity}, {player.birthStateProvince}</p>
      </div>

      <div className="player-stats">
        <h2>Season Stats</h2>
        
        <div>
          <label>Select Year: </label>
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </div>

        {stats ? (
          <div>
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
        ) : (
          <p>No stats available for {selectedYear}</p>
        )}
      </div>
    </div>
  );
}

export default PlayerDetail;
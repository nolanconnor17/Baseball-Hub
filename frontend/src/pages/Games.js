import React, { useState, useEffect } from 'react';
import { getSchedule } from '../services/api';

function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const data = await getSchedule(selectedDate);
        setGames(data.dates?.[0]?.games || []);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching games:', error);
        setLoading(false);
      }
    };

    fetchGames();
  }, [selectedDate]);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return <div>Loading games...</div>;
  }

  return (
    <div className="games">
      <h1>MLB Games</h1>

      <div>
        <label>Select Date: </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {games.length === 0 ? (
        <p>No games scheduled for this date.</p>
      ) : (
        <div className="games-list">
          {games.map((game) => (
            <div key={game.gamePk} className="game-card">

              <div className="game-info">
                <div>Status: {game.status.detailedState}</div>
                <div>Time: {formatTime(game.gameDate)}</div>
              </div>

              <div className="teams">
                <div>
                  {game.teams.away.team.name}
                  {game.status.abstractGameState === 'Final' && (
                    <strong> {game.teams.away.score}</strong>
                  )}
                </div>

                <div>@</div>

                <div>
                  {game.teams.home.team.name}
                  {game.status.abstractGameState === 'Final' && (
                    <strong> {game.teams.home.score}</strong>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Games;

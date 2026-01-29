import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFavorites, getTeamById, getPlayerById } from '../services/api';

function Favorites() {
  const [favoriteTeams, setFavoriteTeams] = useState([]);
  const [favoritePlayers, setFavoritePlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getFavorites(token);
        
        // Fetch team details
        const teamPromises = data.favoriteTeams.map(id => getTeamById(id));
        const teamsData = await Promise.all(teamPromises);
        setFavoriteTeams(teamsData.map(t => t.teams[0]));

        // Fetch player details
        const playerPromises = data.favoritePlayers.map(id => getPlayerById(id));
        const playersData = await Promise.all(playerPromises);
        setFavoritePlayers(playersData.map(p => p.people[0]));

        setLoading(false);
      } catch (error) {
        console.log('Error fetching favorites:', error);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [token]);

  // If not logged in, show message
  if (!token) {
    return (
      <div className="favorites">
        <h1>My Favorites</h1>
        <p>
          Please <Link to="/login">login</Link> or <Link to="/register">create an account</Link> to save your favorite teams and players.
        </p>
      </div>
    );
  }

  if (loading) {
    return <div>Loading favorites...</div>;
  }

  return (
    <div className="favorites">
      <h1>My Favorites</h1>

      <div className="favorites-section">
        <h2>Favorite Teams</h2>
        {favoriteTeams.length === 0 ? (
          <p>No favorite teams yet</p>
        ) : (
          <div className="teams-list">
            {favoriteTeams.map(team => (
              <Link to={`/teams/${team.id}`} key={team.id}>
                <div className="favorite-item">
                  {team.name}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="favorites-section">
        <h2>Favorite Players</h2>
        {favoritePlayers.length === 0 ? (
          <p>No favorite players yet</p>
        ) : (
          <div className="players-list">
            {favoritePlayers.map(player => (
              <Link to={`/players/${player.id}`} key={player.id}>
                <div className="favorite-item">
                  {player.fullName}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
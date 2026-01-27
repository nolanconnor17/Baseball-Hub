import React, { useState, useEffect } from 'react';
import { getStandings } from '../services/api';

function Standings() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const data = await getStandings();
        setStandings(data.records || []);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching standings:', error);
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  if (loading) {
    return <div>Loading standings...</div>;
  }

  return (
    <div className="standings">
      <h1>MLB Standings</h1>
      
      {standings.map((division) => (
        <div key={division.division.id} className="division">
          <h2>{division.division.name}</h2>
          <table>
            <thead>
              <tr>
                <th>Team</th>
                <th>W</th>
                <th>L</th>
                <th>PCT</th>
              </tr>
            </thead>
            <tbody>
              {division.teamRecords.map((team) => (
                <tr key={team.team.id}>
                  <td>{team.team.name}</td>
                  <td>{team.wins}</td>
                  <td>{team.losses}</td>
                  <td>{team.winningPercentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Standings;
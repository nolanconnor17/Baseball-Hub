import React, { useState } from "react";
import { searchPlayers, getPlayerById } from "../services/api";

function PlayerComparison() {
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [year, setYear] = useState("2025");
  const [message, setMessage] = useState("");

  const searchAndSetPlayer = async (searchTerm, setPlayer) => {
    setMessage("");

    if (!searchTerm.trim()) {
      setMessage("Type a player name first.");
      return;
    }

    try {
      const results = await searchPlayers(searchTerm);

      if (results.people && results.people.length > 0) {
        const playerId = results.people[0].id;
        const data = await getPlayerById(playerId, year);
        setPlayer(data.people?.[0] || null);
      } else {
        setMessage(`No results found for "${searchTerm}"`);
        setPlayer(null);
      }
    } catch (error) {
      console.log("Search error:", error);
      setMessage("Something went wrong searching.");
      setPlayer(null);
    }
  };

  // Check if player is a pitcher by position
  const isPitcher1 = player1?.primaryPosition?.abbreviation === 'P';
  const isPitcher2 = player2?.primaryPosition?.abbreviation === 'P';

  const getStats = (player, isPitcher) => {
    if (!player || !player.stats) return null;
    // hitters usually have hitting first
    if (!isPitcher) {
      return player.stats[0]?.splits?.[0]?.stat || null;
    }
    // pitchers sometimes have pitching second, so try [1] first
    return (
      player.stats[1]?.splits?.[0]?.stat ||
      player.stats[0]?.splits?.[0]?.stat ||
      null
    );
  };

  const stats1 = getStats(player1, isPitcher1);
  const stats2 = getStats(player2, isPitcher2);

  // Debug logs
  console.log('Player 1:', player1?.fullName, 'Position:', player1?.primaryPosition?.abbreviation);
  console.log('Player 2:', player2?.fullName, 'Position:', player2?.primaryPosition?.abbreviation);
  console.log('Stats 1:', stats1);
  console.log('Stats 2:', stats2);
  console.log('isPitcher1:', isPitcher1, 'isPitcher2:', isPitcher2);

  return (
    <div className="player-comparison">
      <h1>Compare Players</h1>

      <div>
        <label>Select Year: </label>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
        </select>
        <p style={{ fontSize: "0.9rem", color: "#666" }}>
          (After changing year, click Search again for each player.)
        </p>
      </div>

      {message && <p className="error">{message}</p>}

      <div className="comparison-search">
        <div>
          <h3>Player 1</h3>
          <input
            type="text"
            placeholder="Search player name"
            value={searchTerm1}
            onChange={(e) => setSearchTerm1(e.target.value)}
          />
          <button onClick={() => searchAndSetPlayer(searchTerm1, setPlayer1)}>Search</button>
          {player1 && <p>Selected: {player1.fullName}</p>}
        </div>

        <div>
          <h3>Player 2</h3>
          <input
            type="text"
            placeholder="Search player name"
            value={searchTerm2}
            onChange={(e) => setSearchTerm2(e.target.value)}
          />
          <button onClick={() => searchAndSetPlayer(searchTerm2, setPlayer2)}>Search</button>
          {player2 && <p>Selected: {player2.fullName}</p>}
        </div>
      </div>

      {player1 && player2 && stats1 && stats2 && (
        <>
          {isPitcher1 !== isPitcher2 ? (
            <p className="error">Cannot compare a hitter and a pitcher. Please select two players of the same type.</p>
          ) : (
            <div className="comparison-table">
              <h2>Stats Comparison ({year})</h2>

              <table>
                <thead>
                  <tr>
                    <th>Stat</th>
                    <th>{player1.fullName}</th>
                    <th>{player2.fullName}</th>
                  </tr>
                </thead>
                <tbody>
                  {!isPitcher1 ? (
                    <>
                      <tr><td>AVG</td><td>{stats1.avg}</td><td>{stats2.avg}</td></tr>
                      <tr><td>HR</td><td>{stats1.homeRuns}</td><td>{stats2.homeRuns}</td></tr>
                      <tr><td>RBI</td><td>{stats1.rbi}</td><td>{stats2.rbi}</td></tr>
                      <tr><td>Hits</td><td>{stats1.hits}</td><td>{stats2.hits}</td></tr>
                      <tr><td>Runs</td><td>{stats1.runs}</td><td>{stats2.runs}</td></tr>
                    </>
                  ) : (
                    <>
                      <tr><td>ERA</td><td>{stats1.era}</td><td>{stats2.era}</td></tr>
                      <tr><td>W</td><td>{stats1.wins}</td><td>{stats2.wins}</td></tr>
                      <tr><td>L</td><td>{stats1.losses}</td><td>{stats2.losses}</td></tr>
                      <tr><td>SO</td><td>{stats1.strikeOuts}</td><td>{stats2.strikeOuts}</td></tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PlayerComparison;
import React, { useState, useEffect } from "react";
import { searchPlayers, getPlayerById } from "../services/api";

function PlayerComparison() {
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [searchResults1, setSearchResults1] = useState([]);
  const [searchResults2, setSearchResults2] = useState([]);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [year, setYear] = useState("2025");
  const [message, setMessage] = useState("");

  // Autocomplete search for Player 1
  useEffect(() => {
    if (searchTerm1.length < 2) {
      setSearchResults1([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const results = await searchPlayers(searchTerm1);
        setSearchResults1(results.people || []);
      } catch (error) {
        console.log("Search error:", error);
        setSearchResults1([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm1]);

  // Autocomplete search for Player 2
  useEffect(() => {
    if (searchTerm2.length < 2) {
      setSearchResults2([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const results = await searchPlayers(searchTerm2);
        setSearchResults2(results.people || []);
      } catch (error) {
        console.log("Search error:", error);
        setSearchResults2([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm2]);

  const selectPlayer = async (playerId, playerName, setPlayer, setSearchTerm, setSearchResults) => {
    setSearchTerm(playerName);
    setSearchResults([]);
    setMessage("");

    try {
      const data = await getPlayerById(playerId, year);
      setPlayer(data.people?.[0] || null);
    } catch (error) {
      console.log("Error loading player:", error);
      setMessage("Failed to load player stats.");
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
          (After changing year, re-select players from dropdown.)
        </p>
      </div>

      {message && <p className="error">{message}</p>}

      <div className="comparison-search">
        <div style={{ position: 'relative' }}>
          <h3>Player 1</h3>
          <input
            type="text"
            placeholder="Type player name..."
            value={searchTerm1}
            onChange={(e) => setSearchTerm1(e.target.value)}
          />
          {searchResults1.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'white',
              border: '1px solid #ccc',
              maxHeight: '200px',
              overflowY: 'auto',
              zIndex: 1000
            }}>
              {searchResults1.slice(0, 10).map((p) => (
                <div
                  key={p.id}
                  onClick={() => selectPlayer(p.id, p.fullName, setPlayer1, setSearchTerm1, setSearchResults1)}
                  style={{
                    padding: '8px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #eee'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                >
                  {p.fullName}
                </div>
              ))}
            </div>
          )}
          {player1 && <p>Selected: {player1.fullName}</p>}
        </div>

        <div style={{ position: 'relative' }}>
          <h3>Player 2</h3>
          <input
            type="text"
            placeholder="Type player name..."
            value={searchTerm2}
            onChange={(e) => setSearchTerm2(e.target.value)}
          />
          {searchResults2.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'white',
              border: '1px solid #ccc',
              maxHeight: '200px',
              overflowY: 'auto',
              zIndex: 1000
            }}>
              {searchResults2.slice(0, 10).map((p) => (
                <div
                  key={p.id}
                  onClick={() => selectPlayer(p.id, p.fullName, setPlayer2, setSearchTerm2, setSearchResults2)}
                  style={{
                    padding: '8px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #eee'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                >
                  {p.fullName}
                </div>
              ))}
            </div>
          )}
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
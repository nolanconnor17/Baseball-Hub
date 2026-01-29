import axios from "axios";

// Use environment variable for production, localhost for development
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

/* =========================
   AUTH API CALLS
========================= */
export const register = async (userData) => {
  const response = await axios.post(
    `${API_BASE}/auth/register`,
    userData
  );
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(
    `${API_BASE}/auth/login`,
    credentials
  );
  return response.data;
};

/* =========================
   MLB API CALLS
========================= */
export const getStandings = async () => {
  const response = await axios.get(
    `${API_BASE}/mlb/standings`
  );
  return response.data;
};

export const getSchedule = async (date) => {
  const url = date
    ? `${API_BASE}/mlb/schedule?date=${date}`
    : `${API_BASE}/mlb/schedule`;
  const response = await axios.get(url);
  return response.data;
};

export const getTeams = async () => {
  const response = await axios.get(
    `${API_BASE}/mlb/teams`
  );
  return response.data;
};

export const getTeamById = async (teamId) => {
  const response = await axios.get(
    `${API_BASE}/mlb/teams/${teamId}`
  );
  return response.data;
};

export const getTeamRoster = async (teamId) => {
  const response = await axios.get(
    `${API_BASE}/mlb/teams/${teamId}/roster`
  );
  return response.data;
};

export const getStadiumById = async (venueId) => {
  const response = await axios.get(
    `${API_BASE}/mlb/stadiums/${venueId}`
  );
  return response.data;
};

export const getPlayerById = async (playerId, season) => {
  const url = season
    ? `${API_BASE}/mlb/players/${playerId}?season=${season}`
    : `${API_BASE}/mlb/players/${playerId}`;
  
  const response = await axios.get(url);
  return response.data;
};

export const searchPlayers = async (query) => {
  const response = await axios.get(
    `${API_BASE}/mlb/players/search?q=${query}`
  );
  return response.data;
};

/* =========================
   FAVORITES API CALLS
   (Requires Auth Token)
========================= */
export const getFavorites = async (token) => {
  const response = await axios.get(
    `${API_BASE}/favorites`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const addFavoriteTeam = async (teamId, token) => {
  const response = await axios.post(
    `${API_BASE}/favorites/teams/${teamId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const removeFavoriteTeam = async (teamId, token) => {
  const response = await axios.delete(
    `${API_BASE}/favorites/teams/${teamId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const addFavoritePlayer = async (playerId, token) => {
  const response = await axios.post(
    `${API_BASE}/favorites/players/${playerId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const removeFavoritePlayer = async (playerId, token) => {
  const response = await axios.delete(
    `${API_BASE}/favorites/players/${playerId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};
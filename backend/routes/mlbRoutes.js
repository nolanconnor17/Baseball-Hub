const express = require("express");
const axios = require("axios");
const router = express.Router();

const MLB_API_BASE = "https://statsapi.mlb.com/api/v1";

// Get current standings
router.get("/standings", async (req, res) => {
  try {
    const response = await axios.get(
      `${MLB_API_BASE}/standings?leagueId=103,104`
    );
    res.json(response.data);
  } catch (error) {
    console.log("Error getting standings:", error.message);
    res.status(500).json({ error: "Failed to fetch standings" });
  }
});

// Get schedule (today or specific date)
router.get("/schedule", async (req, res) => {
  try {
    const date = req.query.date || new Date().toISOString().split("T")[0];
    const response = await axios.get(
      `${MLB_API_BASE}/schedule?sportId=1&date=${date}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Schedule error:", error.message);
    res.status(500).json({ error: "Failed to fetch schedule" });
  }
});

// Get all teams
router.get("/teams", async (req, res) => {
  try {
    const response = await axios.get(`${MLB_API_BASE}/teams?sportId=1`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch teams" });
  }
});

// Get specific team
router.get("/teams/:teamId", async (req, res) => {
  try {
    const response = await axios.get(
      `${MLB_API_BASE}/teams/${req.params.teamId}`
    );
    res.json(response.data);
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ error: "Failed to fetch team info" });
  }
});

// Get team roster
router.get("/teams/:teamId/roster", async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const response = await axios.get(
      `${MLB_API_BASE}/teams/${teamId}/roster`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Roster error:", error.message);
    res.status(500).json({ error: "Failed to fetch roster" });
  }
});

// Get stadium/venue info
router.get("/stadiums/:venueId", async (req, res) => {
  try {
    const venueId = req.params.venueId;
    const response = await axios.get(
      `${MLB_API_BASE}/venues/${venueId}?hydrate=location,fieldInfo`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Stadium error:", error.message);
    res.status(500).json({ error: "Failed to fetch stadium info" });
  }
});

// Get player info and stats
router.get("/players/:playerId", async (req, res) => {
  try {
    const playerId = parseInt(req.params.playerId);
    const season = req.query.season || new Date().getFullYear();
    
    const response = await axios.get(
      `${MLB_API_BASE}/people/${playerId}?hydrate=stats(type=season,season=${season})`
    );
    res.json(response.data);
  } catch (error) {
    console.log("Player error:", error.message);
    res.status(500).json({ error: "Failed to fetch player info" });
  }
});

// Search for players
router.get("/players/search", async (req, res) => {
  try {
    const searchName = req.query.q;

    if (!searchName) {
      return res.status(400).json({ error: "Missing q (example: ?q=Judge)" });
    }

    const response = await axios.get(
      `${MLB_API_BASE}/people/search?names=${encodeURIComponent(searchName)}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Search error:", error.message);
    res.status(500).json({ error: "Failed to search players" });
  }
});

module.exports = router;
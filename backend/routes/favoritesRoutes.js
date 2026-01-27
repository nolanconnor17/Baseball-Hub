const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Favorites = require('../models/Favorites');

// Get user's favorites
router.get('/', auth, async (req, res) => {
  try {
    let favorites = await Favorites.findOne({ userId: req.userId });
    
    if (!favorites) {
      favorites = await Favorites.create({
        userId: req.userId,
        favoriteTeams: [],
        favoritePlayers: []
      });
    }

    res.json({
      favoriteTeams: favorites.favoriteTeams,
      favoritePlayers: favorites.favoritePlayers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add team to favorites
router.post('/teams/:teamId', auth, async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId);
    
    let favorites = await Favorites.findOne({ userId: req.userId });
    
    if (!favorites) {
      favorites = await Favorites.create({
        userId: req.userId,
        favoriteTeams: [teamId],
        favoritePlayers: []
      });
    } else {
      if (!favorites.favoriteTeams.includes(teamId)) {
        favorites.favoriteTeams.push(teamId);
        await favorites.save();
      }
    }

    res.json({
      message: 'Team added to favorites',
      favoriteTeams: favorites.favoriteTeams
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove team from favorites
router.delete('/teams/:teamId', auth, async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId);
    
    const favorites = await Favorites.findOne({ userId: req.userId });
    
    if (!favorites) {
      return res.status(404).json({ error: 'Favorites not found' });
    }

    favorites.favoriteTeams = favorites.favoriteTeams.filter(id => id !== teamId);
    await favorites.save();

    res.json({
      message: 'Team removed from favorites',
      favoriteTeams: favorites.favoriteTeams
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add player to favorites
router.post('/players/:playerId', auth, async (req, res) => {
  try {
    const playerId = parseInt(req.params.playerId);
    
    let favorites = await Favorites.findOne({ userId: req.userId });
    
    if (!favorites) {
      favorites = await Favorites.create({
        userId: req.userId,
        favoriteTeams: [],
        favoritePlayers: [playerId]
      });
    } else {
      if (!favorites.favoritePlayers.includes(playerId)) {
        favorites.favoritePlayers.push(playerId);
        await favorites.save();
      }
    }

    res.json({
      message: 'Player added to favorites',
      favoritePlayers: favorites.favoritePlayers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove player from favorites
router.delete('/players/:playerId', auth, async (req, res) => {
  try {
    const playerId = parseInt(req.params.playerId);
    
    const favorites = await Favorites.findOne({ userId: req.userId });
    
    if (!favorites) {
      return res.status(404).json({ error: 'Favorites not found' });
    }

    favorites.favoritePlayers = favorites.favoritePlayers.filter(id => id !== playerId);
    await favorites.save();

    res.json({
      message: 'Player removed from favorites',
      favoritePlayers: favorites.favoritePlayers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
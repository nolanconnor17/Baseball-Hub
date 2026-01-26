# Baseball Hub - API Plan

## What This API Does

This is the backend for my Baseball Hub app. It handles user accounts, lets users save their favorite teams/players, and gets baseball data from the MLB Stats API.

## Tech Stack

- Node.js + Express
- MongoDB for storing users and favorites
- MLB Stats API for all the baseball data

---

## Routes I Need to Build

### User Accounts

**POST /api/auth/register**

- Create a new user account
- Need: username, email, password
- Returns: user info and token for logging in

**POST /api/auth/login**

- Log in existing user
- Need: username, password
- Returns: token

TODO: Figure out how long tokens should last (24 hours?)

---

### Favorites (Need to be logged in)

**GET /api/favorites**

- Get the current user's saved teams and players
- Returns lists of team IDs and player IDs

**POST /api/favorites/teams/:teamId**

- Add a team to favorites
- Example: POST /api/favorites/teams/147 (for Yankees)

**DELETE /api/favorites/teams/:teamId**

- Remove a team from favorites

**POST /api/favorites/players/:playerId**

- Add a player to favorites

**DELETE /api/favorites/players/:playerId**

- Remove a player from favorites

---

### Getting Baseball Data (from MLB API)

These routes will call the MLB Stats API and send the data to my frontend.

**GET /api/mlb/standings**

- Gets current standings for all teams
- Will need to figure out how to format this nicely

**GET /api/mlb/schedule**

- Gets today's games
- Shows home team, away team, game time

**GET /api/mlb/teams/:teamId**

- Gets info about one team
- Team name, division, stadium, etc.

**GET /api/mlb/teams/:teamId/roster**

- Gets the roster for a team
- List of all players

**GET /api/mlb/players/:playerId**

- Gets one player's info and stats
- Name, position, batting average, home runs, etc.

**GET /api/mlb/leaders**

- Top players in different stats (home runs, batting average)
- Might add this later if I have time

---

## Notes Routes (Stretch Goal - Maybe Add Later)

If I have time, let users write notes about players or teams:

**GET /api/notes** - get all my notes
**POST /api/notes** - create a note
**PUT /api/notes/:noteId** - edit a note
**DELETE /api/notes/:noteId** - delete a note

---

## Security Stuff

- Passwords need to be hashed (use bcrypt)
- Use JWT tokens for logged-in users
- Some routes need authentication (favorites, notes)
- MLB data routes don't need login

---

## Things I Need to Figure Out

- How to handle errors properly
- Should I cache MLB API responses so I'm not calling it constantly?
- What if the MLB API is down?
- How to test these routes (Postman?)
- Need to look up the exact MLB API endpoints

---

## Example Request/Response

**Register a user:**

```
POST /api/auth/register
Body: {
  "username": "baseballfan",
  "email": "fan@email.com",
  "password": "password123"
}

Response: {
  "token": "some-jwt-token",
  "user": { "id": "123", "username": "baseballfan" }
}
```

**Add favorite team:**

```
POST /api/favorites/teams/147
Headers: Authorization: Bearer token-here

Response: {
  "message": "Team added to favorites"
}
```

# Baseball Hub - API Plan

## What This API Does

This is the backend for my Baseball Hub app. It:

- Handles user accounts (register/login)
- Lets users save favorite teams/players
- Fetches baseball data from the MLB Stats API and sends it to the frontend

## Tech Stack

- Node.js + Express
- MongoDB (stores users + favorites + optional notes)
- MLB Stats API (all baseball data)

---

## Auth (User Accounts)

### POST /api/auth/register

Create a new user account.

**Body:**

- username
- email
- password

**Returns:**

- token
- user info (id, username, email)

### POST /api/auth/login

Log in an existing user.

**Body:**

- username (or email, depending on final choice)
- password

**Returns:**

- token
- user info

### GET /api/auth/me

Get the currently logged-in user.

**Headers:**

- Authorization: Bearer <token>

**Returns:**

- user info (id, username, email)

---

## Favorites (Must be logged in)

Favorites are stored in one MongoDB document per user:

- favoriteTeams: [teamId, ...]
- favoritePlayers: [playerId, ...]

### GET /api/favorites

Get the current user's saved favorites.

**Headers:**

- Authorization: Bearer <token>

**Returns:**

- favoriteTeams (array of MLB team IDs)
- favoritePlayers (array of MLB player IDs)

### POST /api/favorites/teams/:teamId

Add a team to favorites.

**Headers:**

- Authorization: Bearer <token>

**Returns:**

- message
- updated favorites

### DELETE /api/favorites/teams/:teamId

Remove a team from favorites.

**Headers:**

- Authorization: Bearer <token>

**Returns:**

- message
- updated favorites

### POST /api/favorites/players/:playerId

Add a player to favorites.

**Headers:**

- Authorization: Bearer <token>

**Returns:**

- message
- updated favorites

### DELETE /api/favorites/players/:playerId

Remove a player from favorites.

**Headers:**

- Authorization: Bearer <token>

**Returns:**

- message
- updated favorites

---

## MLB Data (Public - No login required)

These routes call the MLB Stats API and send the data back to the frontend.
(They act like a “proxy” so the frontend doesn’t need to talk to MLB directly.)

### GET /api/mlb/standings

Get current MLB standings.

**Returns (example ideas):**

- team name
- wins/losses
- division
- league

### GET /api/mlb/schedule

Get games for a date (defaults to today).

**Query Params:**

- date=YYYY-MM-DD (optional)

**Returns (example ideas):**

- home team
- away team
- game time
- status (Final / Scheduled / In Progress)
- scores (if available)

### GET /api/mlb/teams

Get a list of MLB teams.

### GET /api/mlb/teams/:teamId

Get info about one team.

### GET /api/mlb/teams/:teamId/roster

Get the roster for a team.

### GET /api/mlb/players/search

Search for players.

**Query Params:**

- q=NAME

### GET /api/mlb/players/:playerId

Get a player’s info + stats.

### GET /api/mlb/leaders (optional)

Get league leaders for stats (HR, AVG, etc.).

---

## Notes (Optional / Stretch Goal)

If implemented, users can create notes about teams/players.

### GET /api/notes

Get all my notes.

### POST /api/notes

Create a note.

### PUT /api/notes/:noteId

Edit a note.

### DELETE /api/notes/:noteId

Delete a note.

---

## Security / Auth Rules

- Passwords are hashed with bcrypt (never store plain text passwords)
- JWT tokens used for authentication
- Favorites + Notes routes require login
- MLB data routes do NOT require login

---

## Things To Figure Out Later (Totally Normal)

- Error handling (what messages to send)
- What to do if MLB API is down
- Whether to cache MLB responses
- How to test routes (Postman + Jest/Supertest)
- Exact MLB Stats API endpoints + formatting

---

## Example Requests

### Register

POST /api/auth/register

Body:

```json
{
  "username": "baseballfan",
  "email": "fan@email.com",
  "password": "password123"
}
```

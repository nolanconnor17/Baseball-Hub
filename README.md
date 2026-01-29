# Baseball Hub

A website for casual baseball fans to check out MLB standings, schedules, rosters, and player stats. You can also create an account to save your favorite teams and players.

**Live Site:** https://baseball-hub-frontend.onrender.com

## What It Does

- View current MLB standings
- Check daily game schedules
- Browse all 30 MLB teams and their rosters
- Look up player statistics from 2020-2025
- Compare two players' stats side-by-side
- Create an account to save favorite teams and players
- View stadium information like capacity and field dimensions

## Technologies Used

**Frontend**

- React
- React Router
- Axios
- CSS

**Backend**

- Node.js
- Express
- MongoDB
- JWT authentication
- bcrypt for passwords

**Other**

- MLB Stats API for baseball data
- Deployed on Render
- MongoDB Atlas database

## How to Run Locally

**Backend:**

1. Clone the repo
2. `cd backend`
3. `npm install`
4. Create a `.env` file with:
   - MONGODB_URI=your_connection_string
   - JWT_SECRET=your_secret
   - PORT=3001
5. `npm run dev`

**Frontend:**

1. `cd frontend`
2. `npm install`
3. `npm start`

Backend runs on port 3001, frontend on port 3000.

## Project Structure

```
backend/
  models/
  routes/
  middleware/
  server.js
frontend/
  src/
    pages/
    services/
    App.js
    App.css
```

## Known Issues

- Two-way players like Shohei Ohtani might show wrong stats sometimes
- No way to reset your password if you forget it
- Email is required to sign up but isn't used for anything yet
- Player comparison only works for the same year (can't compare 2024 Judge vs 2023 Ohtani)

## Future Ideas

- Add password reset
- Let users compare players from different years
- Search suggestions as you type player names
- Better mobile layout
- Email notifications for favorite teams' games

## API Endpoints

Authentication:

- POST /api/auth/register
- POST /api/auth/login

Favorites (need to be logged in):

- GET /api/favorites
- POST /api/favorites/teams/:teamId
- DELETE /api/favorites/teams/:teamId
- POST /api/favorites/players/:playerId
- DELETE /api/favorites/players/:playerId

MLB Data:

- GET /api/mlb/standings
- GET /api/mlb/schedule
- GET /api/mlb/teams
- GET /api/mlb/teams/:teamId
- GET /api/mlb/teams/:teamId/roster
- GET /api/mlb/players/:playerId
- GET /api/mlb/players/search
- GET /api/mlb/stadiums/:venueId

---

_Submitted for USF Coding Bootcamp Capstone - January 2026_

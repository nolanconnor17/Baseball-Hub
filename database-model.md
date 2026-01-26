# Baseball Hub - Database Model

## Overview

This database stores user account information and user-generated data (favorites and notes). All baseball data (teams, players, stats, games) comes from the MLB Stats API and is NOT stored in our database.

## MongoDB Collections

### 1. Users Collection

Stores user account information for authentication.

**Fields:**

- \_id: ObjectId (auto-generated)
- username: String, unique, required
- email: String, unique, required
- password: String, hashed with bcrypt, required
- createdAt: Date, default: Date.now()

**Example Document:**
{
\_id: ObjectId("507f1f77bcf86cd799439011"),
username: "baseballfan22",
email: "fan@example.com",
password: "$2b$10$...",
createdAt: 2025-01-26T10:30:00.000Z
}

### 2. Favorites Collection

Stores user's favorite teams and players (references MLB API IDs).

**Fields:**

- \_id: ObjectId (auto-generated)
- userId: ObjectId (reference to Users collection)
- favoriteTeams: Array of Numbers (MLB team IDs from API)
- favoritePlayers: Array of Numbers (MLB player IDs from API)
- createdAt: Date, default: Date.now()
- updatedAt: Date, default: Date.now()

**Example Document:**
{
\_id: ObjectId("507f1f77bcf86cd799439012"),
userId: ObjectId("507f1f77bcf86cd799439011"),
favoriteTeams: [147, 121],
favoritePlayers: [660271, 592450],
createdAt: 2025-01-26T10:35:00.000Z,
updatedAt: 2025-01-26T14:20:00.000Z
}

### 3. Notes Collection (Optional - Stretch Goal)

Stores user notes about teams or players.

**Fields:**

- \_id: ObjectId (auto-generated)
- userId: ObjectId (reference to Users collection)
- itemType: String ("team" or "player")
- itemId: Number (MLB team/player ID from API)
- noteText: String, max 500 characters
- createdAt: Date, default: Date.now()
- updatedAt: Date, default: Date.now()

**Example Document:**
{
\_id: ObjectId("507f1f77bcf86cd799439013"),
userId: ObjectId("507f1f77bcf86cd799439011"),
itemType: "player",
itemId: 660271,
noteText: "Amazing pitcher and hitter. Watch his games!",
createdAt: 2025-01-26T11:00:00.000Z,
updatedAt: 2025-01-26T11:00:00.000Z
}

## Relationships

Users ↔ Favorites: One-to-One

- Each user can have ONE favorites document
- Each favorites document belongs to ONE user

Users ↔ Notes: One-to-Many

- Each user can have MANY notes
- Each note belongs to ONE user

## Design Decisions

Why not store baseball data?

- MLB Stats API already provides all team/player/game data
- Storing it might create data sync issues and redundancy, so I decided to only store user-generated data.
- We only need to store user preferences and user-generated content

Why store MLB IDs instead of full data?

- Team/player data changes (stats, rosters, etc.)
- Storing IDs lets us always fetch the latest data from the API
- Keeps our database lightweight

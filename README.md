# Full-Stack Weather App - PM Accelerator AI Engineer Intern

This project is a full-stack weather application built for the **AI Engineer Intern** technical assessment at PM Accelerator. It allows users to search for real-time weather, view a 5-day forecast, and explore related media (Google Maps & YouTube videos). All searches are persisted in a PostgreSQL database (via Neon & Prisma) with full CRUD operations and Data Export capabilities (JSON/CSV).

**Developed by:** José Ignacio Leguizamón — Software Developer
- [LinkedIn](https://www.linkedin.com/in/ignaciolegui/)
- [GitHub](https://github.com/IgnacioLegui)

## Tech Stack
- **Frontend:** React, Vite, TypeScript, Tailwind CSS, Lucide Icons.
- **Backend:** Node.js, Express, TypeScript, Prisma ORM, tsx, Axios.
- **Database:** PostgreSQL (Neon Serverless).
- **APIs:** OpenWeatherMap, YouTube Data API v3, Google Maps Embed.

## Requirements
- Node.js (v18+)
- PostgreSQL Database (Neon recommended)
- API Keys:
  - OpenWeatherMap API Key
  - YouTube Data API v3 Key

## Installation & Setup

### 1. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create/edit `backend/.env` and fill in your keys:
   ```env
   DATABASE_URL="postgresql://user:password@ep-host.neon.tech/neondb?sslmode=require"
   OPENWEATHER_API_KEY="your_openweather_key"
   YOUTUBE_API_KEY="your_youtube_key"
   ```
4. Apply the Prisma schema to the database:
   ```bash
   npx prisma db push
   ```
5. Start the backend server:
   ```bash
   npx tsx --watch src/server.ts
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the application in your browser at `http://localhost:5173`.

## Features
- **Search Weather:** Search by City name, Zip Code, GPS Coordinates (lat,lon), or Landmarks.
- **Real-time Weather:** Displays temperature, feels like, humidity, wind speed, and official OpenWeatherMap icons.
- **5-Day Forecast:** Dynamic horizontal layout showing daily temperature with weather icons.
- **Media Integrations:** Embedded Google Maps location view and related YouTube travel guide videos.
- **CRUD History:**
  - **Create:** Automatically saves each search with full weather data.
  - **Read:** View all past searches in a table with location, temperature, and date.
  - **Update:** Add or edit notes on any saved search via inline editing.
  - **Delete:** Remove individual search records.
- **Data Export:** Export full search history to JSON or CSV formats.
- **Responsive Design:** Fully responsive layout for Mobile and Desktop.
- **Modern UI:** Animated gradient background, floating weather particles, glassmorphism cards, smooth animations and micro-interactions.

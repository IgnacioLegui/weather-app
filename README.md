# Weather App ⛅

**Weather App** is a full-stack weather application built as a technical assessment for the **AI Engineer Intern** position at **PM Accelerator**. It provides real-time weather data, a 5-day forecast, media integrations (Google Maps & YouTube), full CRUD search history, and data export — all in a modern dark-themed animated interface.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7-blueviolet?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?logo=postgresql)
![Build](https://img.shields.io/badge/build-passing-brightgreen)

---

## 🚀 Key Features

### 🔍 Weather Search
- **Flexible Input**: Search by city name, zip code, GPS coordinates (lat,lon), or landmarks.
- **Real-time Data**: Temperature, feels like, humidity, wind speed, and weather description.
- **Official Icons**: Dynamic OpenWeatherMap weather icons for all conditions.

### 📅 5-Day Forecast
- **Extended Forecast**: Daily temperature and conditions for the next 5 days.
- **Visual Cards**: Staggered animated cards with weather icons and descriptions.

### 🗺️ Media Integrations
- **Google Maps**: Embedded interactive map for the searched location.
- **YouTube Videos**: Automatically fetches related travel guide videos.

### 📋 CRUD History
- **Create**: Every search is automatically saved with full weather data.
- **Read**: View all past searches in a sortable table.
- **Update**: Add or edit notes on any search via inline editing.
- **Delete**: Remove individual records with one click.

### 📊 Data Export
- **JSON Export**: Download full search history as a formatted JSON file.
- **CSV Export**: Download history as a CSV spreadsheet.

### 🎨 Modern UI
- **Animated Gradient Background**: Smooth shifting dark gradients.
- **Floating Particles**: Weather emoji particles floating across the screen.
- **Glassmorphism**: Backdrop-blur cards with transparency.
- **Micro-animations**: Fade-in, hover glow, stagger, and pulse effects.
- **Responsive Design**: Fully responsive for mobile and desktop.

---

## 🛠️ Technology Stack

| Component       | Technology                          |
|----------------|-------------------------------------|
| Frontend        | React 18 + TypeScript               |
| Build Tool      | Vite                                |
| Styling         | Tailwind CSS                        |
| Icons           | Lucide React + OpenWeatherMap Icons |
| Backend         | Node.js + Express + TypeScript      |
| ORM             | Prisma 7                            |
| Database        | PostgreSQL (Neon Serverless)        |
| Runtime         | tsx                                 |
| Weather API     | OpenWeatherMap API                  |
| Video API       | YouTube Data API v3                 |
| Maps            | Google Maps Embed (free)            |

---

## 📥 Installation

### Prerequisites
- Node.js (v18+)
- API Keys:
  - [OpenWeatherMap](https://openweathermap.org/api) API Key
  - [YouTube Data API v3](https://console.cloud.google.com/) Key
- PostgreSQL Database ([Neon](https://neon.tech/) recommended — free tier)

### Backend Setup
1. **Navigate to the backend folder**:
   ```bash
   cd backend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure environment variables** — create `backend/.env`:
   ```env
   DATABASE_URL="postgresql://user:password@ep-host.neon.tech/neondb?sslmode=require"
   OPENWEATHER_API_KEY="your_openweather_key"
   YOUTUBE_API_KEY="your_youtube_key"
   ```
4. **Push the schema to the database**:
   ```bash
   npx prisma db push
   ```
5. **Start the backend server**:
   ```bash
   npx tsx --watch src/server.ts
   ```

### Frontend Setup
1. **Navigate to the frontend folder**:
   ```bash
   cd frontend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Open in browser**: [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure
```
weather_app/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma       # Database schema (WeatherSearch model)
│   ├── src/
│   │   ├── routes/
│   │   │   ├── weather.ts      # Search, History, Update, Delete endpoints
│   │   │   ├── integrations.ts # YouTube & Google Maps endpoints
│   │   │   └── export.ts       # JSON & CSV export endpoints
│   │   ├── prisma.ts           # Prisma client initialization
│   │   └── server.ts           # Express server setup
│   ├── prisma.config.ts        # Prisma config for migrations
│   ├── package.json
│   └── .env                    # Environment variables (not tracked)
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg         # Custom weather favicon
│   ├── src/
│   │   ├── App.tsx             # Main application component
│   │   ├── index.css           # Animations & design system
│   │   └── main.tsx            # React entry point
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── package.json
│
└── README.md
```

---

## 📬 Contact Developer
**José Ignacio Leguizamón**  
Software Developer

[![Website](https://img.shields.io/badge/Website-ignacioleguizamon.site-blueviolet?style=flat&logo=safari)](https://ignacioleguizamon.site)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/ignaciolegui/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat&logo=github)](https://github.com/IgnacioLegui)

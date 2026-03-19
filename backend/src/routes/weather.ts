import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';
import axios from 'axios';

const router = Router();

router.post('/search', async (req: Request, res: Response): Promise<any> => {
  try {
    let { location } = req.body;
    if (!location) {
      return res.status(400).json({ error: 'Location is required' });
    }

    const API_KEY = process.env.OPENWEATHER_API_KEY;
    if (!API_KEY) {
      return res.status(500).json({ error: 'OpenWeather API Key is not configured' });
    }

    // Detect if it's a coordinate input (lat,lon format)
    let weatherUrl: string;
    let forecastUrl: string;
    const coordMatch = location.match(/^(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)$/);

    if (coordMatch) {
      const [, lat, lon] = coordMatch;
      weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    } else {
      weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=metric`;
      forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=metric`;
    }

    // Call OpenWeatherMap API
    const weatherRes = await axios.get(weatherUrl);
    const forecastRes = await axios.get(forecastUrl);
    
    // Extract info
    const data = weatherRes.data;
    const temperature = data.main.temp;
    const feelsLike = data.main.feels_like;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const condition = data.weather[0].main;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const foundLocationName = `${data.name}, ${data.sys.country}`;

    // Store in DB (CREATE)
    const newSearch = await prisma.weatherSearch.create({
      data: {
        locationQuery: location,
        foundLocationName,
        temperature,
        feelsLike,
        humidity,
        windSpeed,
        condition,
        description,
        icon,
        forecastData: forecastRes.data,
      }
    });

    return res.status(201).json(newSearch);
  } catch (error: any) {
    console.error('Weather Search Error:', error?.response?.data || error.message);
    if (error?.response?.status === 404) {
      return res.status(404).json({ error: 'Location not found. Please check the city name, zip code, or coordinates.' });
    }
    return res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

router.get('/history', async (req: Request, res: Response): Promise<any> => {
  try {
    const history = await prisma.weatherSearch.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.json(history);
  } catch (error: any) {
    console.error('History Error:', error.message, error);
    return res.status(500).json({ error: 'Failed to fetch history' });
  }
});

router.put('/history/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { notes } = req.body;
    
    const updated = await prisma.weatherSearch.update({
      where: { id: id as string },
      data: { notes }
    });
    
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update record' });
  }
});

router.delete('/history/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    await prisma.weatherSearch.delete({
      where: { id: id as string }
    });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete record' });
  }
});

export default router;

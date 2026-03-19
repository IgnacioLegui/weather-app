import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

router.get('/media', async (req: Request, res: Response): Promise<any> => {
  try {
    const { location } = req.query;
    if (!location) {
      return res.status(400).json({ error: 'Location query parameter is required' });
    }

    const youtubeKey = process.env.YOUTUBE_API_KEY;
    let videoId = null;

    if (youtubeKey) {
      // Fetch related YouTube video (e.g. travel guide or walk tour)
      try {
        const ytRes = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
          params: {
            part: 'snippet',
            q: `${location} travel guide tour`,
            type: 'video',
            key: youtubeKey,
            maxResults: 1
          }
        });
        if (ytRes.data.items && ytRes.data.items.length > 0) {
          videoId = ytRes.data.items[0].id.videoId;
        }
      } catch (err: any) {
        console.error('YouTube API Error:', err?.response?.data || err.message);
      }
    }

    // Use the free Google Maps embed (no API key required)
    const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(location as string)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

    return res.json({ videoId, googleMapsEmbedUrl });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch integrations' });
  }
});

export default router;

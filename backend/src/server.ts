import dotenv from 'dotenv';
import path from 'path';

// Load .env BEFORE anything else
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

import express from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weather';
import integrationRoutes from './routes/integrations';
import exportRoutes from './routes/export';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/integrations', integrationRoutes);
app.use('/api/export', exportRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Only listen when running locally (not on Vercel)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`DATABASE_URL loaded: ${process.env.DATABASE_URL ? 'YES' : 'NO'}`);
  });
}

export default app;

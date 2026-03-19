import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';

const router = Router();

router.get('/:format', async (req: Request, res: Response): Promise<any> => {
  try {
    const { format } = req.params;
    const history = await prisma.weatherSearch.findMany({
      orderBy: { createdAt: 'desc' }
    });

    if (format === 'json') {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', 'attachment; filename=weather_history.json');
      return res.send(JSON.stringify(history, null, 2));
    }

    if (format === 'csv') {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=weather_history.csv');
      
      let csv = 'ID,Location Query,Found Location Name,Temperature,Condition,Notes,Date\n';
      for (const record of history) {
        csv += `"${record.id}","${record.locationQuery}","${record.foundLocationName || ''}","${record.temperature || ''}","${record.condition || ''}","${record.notes || ''}","${record.createdAt.toISOString()}"\n`;
      }
      return res.send(csv);
    }

    return res.status(400).json({ error: 'Unsupported format. Use json or csv.' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to export history' });
  }
});

export default router;

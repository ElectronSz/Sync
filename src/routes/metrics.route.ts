import { Router, Request, Response } from 'express';
import { Metrics } from '@prisma/client/runtime/library';
import { getMetrics } from '../models/Metrics.model';

const metricsRouter = Router();

metricsRouter.get('/all', async (req: Request, res: Response) => {
    
    let metrics: Metrics = await getMetrics()
    
    res.status(200).json({ "metrics": metrics })
});

export { metricsRouter }
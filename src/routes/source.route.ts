import { Router, Request, Response } from 'express';
import { Source } from '../types/Source';
import { createSource, getSources } from '../models/Source.model';
import { authMiddleware } from '../middlewares/auth.middleware';

const sourceRouter = Router();

sourceRouter.get('/all/:userId', authMiddleware, async (req: Request, res: Response) => {
    
    const userId = req.params.userId
    
    let sources: string[] = await getSources(Number(userId));
    
    res.status(200).json({ "sources": sources })
});

sourceRouter.post('/create', authMiddleware, async (req: Request, res: Response) => {
    
    const source: Source = req.body
    
    const createdSource: Source = await createSource(source);

    res.status(200).json({ "user": createdSource })
});

export { sourceRouter }
import { Router, Request, Response } from 'express';
import { Source } from '../types/Source';
import { createTarget, getTarget } from '../models/Target.model';
import { authMiddleware } from '../middlewares/auth.middleware';
import { Target } from '../types/Target';

const targetRouter = Router();

targetRouter.get('/all/:userId', authMiddleware, async (req: Request, res: Response) => {
    
    const userId = req.params.userId
    
    let sources: any = await getTarget(Number(userId));
    
    res.status(200).json({ "sources": sources })
});

targetRouter.post('/create', authMiddleware, async (req: Request, res: Response) => {
    
    const target: Target = req.body
    
    const createdTarget: Target = await createTarget(target);

    res.status(200).json({ "target": createTarget })
});

export { targetRouter }
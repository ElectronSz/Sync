import { Router, Request, Response } from 'express';
import { stopSyncing, syncAndWatchFiles } from '../utils/sync-file';
import { authMiddleware } from '../middlewares/auth.middleware';
import { getSources } from '../models/Source.model';

const syncRouter = Router();

  //start sync
  syncRouter.post('/start', async (req: Request, res: Response) => {
       
    const { userId } = req.body;
    
    const dirs = await getSources(Number(userId));

   await syncAndWatchFiles(dirs, userId);

    res.status(200).json({
        message: "Sync successfully started.."
    })
});

//stop sync
syncRouter.post('/stop',  async (req: Request, res: Response) => {
   
   await stopSyncing();

    res.status(200).json({
        message: "Sync successfully stoped..."
    })
});

export { syncRouter }
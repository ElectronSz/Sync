import { Router, Request, Response } from 'express';
import { stopSyncing, syncAndWatchFiles } from '../utils/sync-file';
import { authMiddleware } from '../middlewares/auth.middleware';

const syncRouter = Router();

  //start sync
  syncRouter.post('/start', authMiddleware, async (req: Request, res: Response) => {
       
    const { dirs } = req.body;
    

   await syncAndWatchFiles(dirs);

    res.status(200).json({
        message: "Sync successfully started.."
    })
});

//stop sync
syncRouter.post('/stop',authMiddleware,  async (req: Request, res: Response) => {
   
   await stopSyncing();

    res.status(200).json({
        message: "Sync successfully stoped..."
    })
});

export { syncRouter }
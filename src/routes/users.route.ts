import { Router, Request, Response } from 'express';
import { createUser, getUsers } from '../models/User.model';
import { User } from '../types/User';
import { authMiddleware } from '../middlewares/auth.middleware';

const userRouter = Router();

userRouter.get('/all',authMiddleware,  async (req: Request, res: Response) => {
    
    let users: User[] = await getUsers();
    
    res.status(200).json({ "users": users })
});

userRouter.post('/create', authMiddleware, async (req: Request, res: Response) => {
    
    const user: User = req.body
    const createdUser: User = await createUser(user);

    res.status(200).json({ "user": createdUser })
});

export { userRouter }
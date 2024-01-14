import { Router, Request, Response } from 'express';
import { compare , hash } from "bcryptjs" 
import { sign } from "jsonwebtoken";
import { createUser, getUser } from '../models/User.model';
import { User } from '../types/User';
import { createUserFolder } from '../utils/createBaseFolder';

const authRouter = Router();

authRouter.post('/signIn', async (req: Request, res: Response) => {
    
    let {email, password} = req.body;

    const user = await getUser(email);

    if(!user){
        res.status(500).json({status:'failed', message: "Authentication failed, user provided not available"})
    }
    
    const passwordMatch = await compare(password, user!.password);

    if (!passwordMatch) {
        res.status(500).json({status:'failed', message: "Authentication failed, Invalid email or password"})
    }

    const token: any = {}

    token['accessToken'] = sign({ userId: user!.id }, process.env.AUTH_SECRET!, { expiresIn: '1h' })
    token['refreshToken'] = await createRefreshToken(user!.id)
    token['expiresIn'] = '1h'

    res.status(200).json({ user, token})
});


authRouter.post('/signUp', async (req: Request, res: Response) => {
    
    const user: User = req.body
   
    let hashedPassword = await hash(user.password, 10)
    user['password'] = hashedPassword
    
    const createdUser: User = await createUser(user)

    if(!createdUser){
        res.status(500).json({status: 'failed', message: 'Error creating a user...'})
    }

    //create target folder
    const baseFolder: string = process.env.BASE_FOLDER!
    await createUserFolder(baseFolder, user.email);
    
    const token: any = {}

     token['accessToken'] = sign({ userId: createdUser.id }, process.env.AUTH_SECRET!, { expiresIn: '1h' })
     token['refreshToken'] = await createRefreshToken(createdUser.id)
     token['expiresIn'] = '1h'

    res.status(200).json({ status: 'ok', user, token})
});


const createRefreshToken = async (userId: any) => {
    try {
      const refreshToken = await sign({ userId }, process.env.AUTH_SECRET!, {
        expiresIn: '2h',
      });
  
      return refreshToken;
    } catch (error) {
      throw new Error('Failed to create refresh token');
    }
  };
export { authRouter }
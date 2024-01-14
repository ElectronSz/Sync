import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = await verify(token, '061kW5hngY');
    req.user = decoded; 

    next(); //
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export { authMiddleware }

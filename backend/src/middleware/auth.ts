import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';

// JWT Secret with proper typing
const JWT_SECRET: Secret = process.env.JWT_SECRET || "your-fallback-secret-key";

interface TokenPayload extends JwtPayload {
  id: string;
}

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ message: 'Access token required' });
      return;
    }

    // Use properly typed JWT verification
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    
    if (!decoded.id) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }
};

// New: optional authentication that does not error when no/invalid token
export const optionalAuthenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      next();
      return;
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
      if (decoded?.id) {
        const user = await User.findById(decoded.id).select('-password');
        if (user) {
          req.user = user;
        }
      }
    } catch {
      // Ignore token errors in optional auth and proceed as unauthenticated
    }

    next();
  } catch {
    // On unexpected errors, still allow request to proceed unauthenticated
    next();
  }
};

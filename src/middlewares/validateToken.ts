import { RequestHandler } from 'express';
import { UserDecodedData } from '../@types/auth';
import jwt from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserDecodedData;
  }
}

export const validateToken: RequestHandler = (req, res, next) => {
  if (
    req.cookies &&
    typeof req.cookies === 'object' &&
    'token' in req.cookies
  ) {
    const { token } = req.cookies as { token: string };
    const { JWT_SECRET } = process.env;
    if (!JWT_SECRET) {
      // todo: créer une ConfigurationError
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        // todo: créer une UnauthorizedError
        res.status(401).send('Unauthorized');
        return;
      }
      req.user = user as UserDecodedData;
      next();
    });
  } else {
    // todo: créer une UnauthorizedError
    res.status(401).send('Unauthorized');
    return;
  }
};

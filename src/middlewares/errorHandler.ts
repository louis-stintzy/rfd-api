import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';

// todo: gestion + log des erreurs

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);
  if (err instanceof Error && err.message.includes('CORS')) {
    res.status(403).json({ error: err.message });
  }
  if (err instanceof Error) {
    res.status(500).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'An unexpected error has occurred' });
  }
};

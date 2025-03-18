import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';

// todo: gestion + log des erreurs

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);
  if (err instanceof Error) {
    res.status(500).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Une erreur inattendue est survenue' });
  }
};

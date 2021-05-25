import { Request, Response, NextFunction } from 'express';
import { ErrorAutorizacion } from '../errores/error-autorizacion';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.usuarioActual) {
    throw new ErrorAutorizacion();
  }

  next();
};

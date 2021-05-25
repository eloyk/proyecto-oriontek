import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config'

interface UsuarioCargado {
  id: string;
  email: string;
  superUsuario?: boolean;
  estadoUsuario?: boolean;
}

declare global {
  namespace Express {
    interface Request {
      usuarioActual?: UsuarioCargado;
    }
  }
}

export const usuarioActual = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const cargado = jwt.verify(
      req.session.jwt,
      config.jwtSecret
    ) as UsuarioCargado;
    req.usuarioActual = cargado;
  } catch (err) {}

  next();
};

import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ErrorValidacionSolicitud } from '../errores/error-validacion-solicitud';

export const validarSolicitud = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    throw new ErrorValidacionSolicitud(errores.array());
  }

  next();
};

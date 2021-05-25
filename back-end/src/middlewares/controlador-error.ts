import { Request, Response, NextFunction } from 'express';
import { ErrorPersonalizado } from '../errores/error-personalizado';

export const controladorError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorPersonalizado) {
    return res
      .status(err.statusCode)
      .send({ errores: err.serializarErrores() });
  }

  console.error(err);
  res.status(400).send({
    errores: [{ mensaje: 'algo salio mal' }],
  });
};

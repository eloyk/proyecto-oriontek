import { Request, Response } from 'express';

export const usuarioActual = (req: Request, res: Response) => {
  res.send({ usuarioActual: req.usuarioActual || null });
}


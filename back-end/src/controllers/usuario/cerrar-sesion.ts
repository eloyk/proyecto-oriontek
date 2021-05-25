import { Request, Response } from 'express';

export const cerrarsesion = (req: Request, res: Response) => {
  req.session = null;

  res.send({});
};


import { Request, Response } from 'express';
import { Empresa } from '../../models/empresa';

export const indexEmpresa = async (req: Request, res: Response) => {
  const empresa = await Empresa.find();

  res.send(empresa);
}
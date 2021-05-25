import { Request, Response } from 'express';
//import { requireAuth } from '@eloyk/comun';
import { Empresa } from '../../models/empresa';

export const indexEmpresa = async (req: Request, res: Response) => {
  const empresa = await Empresa.find();

  res.send(empresa);
}
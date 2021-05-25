import { Request, Response } from 'express';
import { Empresa } from '../../models/empresa'
import { ErrorNoEncontrado } from '../../errores/error-no-encontrado';

export const verEmpresa = async (req: Request, res: Response) => {
    const empresa = await Empresa.findById(req.params.id);
    
    if (!empresa) {
      throw new ErrorNoEncontrado();
    }

    res.send(empresa);
  }
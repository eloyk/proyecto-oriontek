import { Request, Response } from 'express';
import {ErrorNoEncontrado} from '../../errores/error-no-encontrado';
import { Empresa } from '../../models/empresa';

export const actualizarEmpresa = async (req: Request, res: Response) => {
    const {
      nombreEmpresa,
      duenio,
      telefono,
      emailEmpresa
    } = req.body;
    const empresa = await Empresa.findById(req.params.id);

    if (!empresa) {
      throw new ErrorNoEncontrado();
    }
    empresa.set({
      nombreEmpresa,
      duenio,
      telefono,
      emailEmpresa
    });
    await empresa.save();

    res.status(201).send(empresa);
  }
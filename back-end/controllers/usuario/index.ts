import { Request, Response } from 'express';
import { Usuario } from '../../models/usuario';

export const indexUsuario = async (req: Request, res: Response) => {
  const usuario = await Usuario.find();

  res.send(usuario);
};


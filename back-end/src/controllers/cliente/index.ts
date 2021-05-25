import { Request, Response } from 'express';
import { Cliente } from '../../models/cliente';

export const indexCliente = async (req: Request, res: Response) => {
  const cliente = await Cliente.find();

  res.send(cliente);
}
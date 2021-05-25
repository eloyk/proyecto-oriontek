import { Request, Response } from 'express';
import { DireccionCliente } from '../../models/direccion-cliente';

export const indexDireccionCliente = async (req: Request, res: Response) => {
  const direccionCliente = await DireccionCliente.find();

  res.send(direccionCliente);
}
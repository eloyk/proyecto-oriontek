import { Request, Response } from 'express';
import { Cliente } from '../../models/cliente';

export const indexCliente = async (req: Request, res: Response) => {
  const cliente = await Cliente.find({estado:true}).populate('direccionCliente')
  .populate({
    path: 'direccionCliente',
    match: { estado: true },
});

  res.send(cliente);
}
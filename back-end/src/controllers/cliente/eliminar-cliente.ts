import { Request, Response } from 'express';
import { SolicitudIncorrecta } from '../../errores/solicitud-incorrecta';
import { Cliente } from '../../models/cliente';

export const eliminarCliente = async (req: Request, res: Response) => {
    const cliente = await Cliente.findById(req.params.id);

    if (!cliente) {
      throw new SolicitudIncorrecta('El cliente no es valida');
    }
    cliente.set({
      estado: false
    });
    await cliente.save();

    res.status(201).send(cliente);
}
import { Request, Response } from 'express';
import { SolicitudIncorrecta } from '../../errores/solicitud-incorrecta';
import { DireccionCliente } from '../../models/direccion-cliente';

export const eliminarDireccionCliente = async (req: Request, res: Response) => {
    const direccionCliente = await DireccionCliente.findById(req.params.id);

    if (!direccionCliente) {
      throw new SolicitudIncorrecta('La direccion del cliente no es valida');
    }
    direccionCliente.set({
      estado: false
    });
    await direccionCliente.save();

    res.status(201).send(direccionCliente);
}
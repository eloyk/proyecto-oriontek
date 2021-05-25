import { Request, Response } from 'express';
import { SolicitudIncorrecta } from '../../errores/solicitud-incorrecta';
import { Cliente } from '../../models/cliente';

export const actualizarCliente = async (req: Request, res: Response) => {
    const {
      nombres,
      apellidos,
      telefono,
      tipoDocumento,
      numeroDocumento,
    } = req.body;
    const cliente = await Cliente.findById(req.params.id);

    if (!cliente) {
      throw new SolicitudIncorrecta('El cliente no es valida');
    }
    cliente.set({
      nombres,
      apellidos,
      telefono,
      tipoDocumento,
      numeroDocumento,
    });
    await cliente.save();

    res.status(201).send(cliente);
}
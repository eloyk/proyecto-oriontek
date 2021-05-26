import { Request, Response } from 'express';
import { Cliente } from '../../models/cliente'
import { SolicitudIncorrecta } from '../../errores/solicitud-incorrecta';

export const verCliente = async (req: Request, res: Response) => {
    const cliente = await Cliente.findOne({_id:req.params.id, estado:true})
    .populate({
      path: 'direccionCliente',
      match: { estado: true },
  });
    
    if (!cliente) {
      throw new SolicitudIncorrecta('El cliente no es valida');
    }

    res.send(cliente);
  }
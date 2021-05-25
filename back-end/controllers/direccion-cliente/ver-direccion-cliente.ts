import { Request, Response } from 'express';
import { DireccionCliente } from '../../models/direccion-cliente'
import { SolicitudIncorrecta } from '../../errores/solicitud-incorrecta';

export const verDireccionCliente = async (req: Request, res: Response) => {
  const direccionCliente = await DireccionCliente.findOne({_id: req.params.id, estado: true});
  
  if (!direccionCliente) {
    throw new SolicitudIncorrecta('La direccion del cliente no es valida o fue eliminada');
  }

  res.send(direccionCliente);
}
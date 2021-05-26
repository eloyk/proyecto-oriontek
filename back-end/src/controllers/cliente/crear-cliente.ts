import { Request, Response } from 'express';
import { SolicitudIncorrecta } from '../../errores/solicitud-incorrecta';
import { Cliente } from '../../models/cliente';
import { DireccionCliente } from '../../models/direccion-cliente';
import { Empresa } from '../../models/empresa';

export const registrarCliente = async (req: Request, res: Response) => {
    const { 
      nombres,
      apellidos,
      telefono,
      correoElectronico,
      tipoDocumento,
      numeroDocumento,
      direccion
    } = req.body;
    
    let cliente = await Cliente.findOne({ correoElectronico, tipoDocumento, numeroDocumento })
    .populate({
      path: 'direccionCliente',
      match: { estado: true },
    });

    if (cliente) {
      const validarDireccionCliente = await DireccionCliente.findOne({clienteId: cliente!._id, direccion});

      if (validarDireccionCliente) {
        throw new SolicitudIncorrecta('Esta direccion esta agregada para este cliente, favor intentar nuevamente');
      }

      const direccionCliente = DireccionCliente.build({
        clienteId: cliente!._id,
        direccion,
        usuarioIdAlta: req.usuarioActual!.id,
        emailUsuarioAlta: req.usuarioActual!.email,
      })
      await direccionCliente.save();

      if(cliente.estado == false){
        throw new SolicitudIncorrecta('Este cliente fue dado de baja favor ponerse en contacto con el administrador')
      }
      cliente.direccionCliente!.push(direccionCliente);
    }else{
      const empresa = await Empresa.findOne({nombreEmpresa: 'empresa x'});

      cliente = Cliente.build({ 
        nombres,
        apellidos,
        telefono,
        empresaId: empresa!._id,
        correoElectronico,
        tipoDocumento,
        numeroDocumento,
        usuarioIdAlta: req.usuarioActual!.id,
        emailUsuarioAlta: req.usuarioActual!.email,
      });

      const direccionCliente = DireccionCliente.build({
        clienteId: cliente!._id,
        direccion,
        usuarioIdAlta: req.usuarioActual!.id,
        emailUsuarioAlta: req.usuarioActual!.email,
      })
      await direccionCliente.save();
      
      cliente.direccionCliente!.push(direccionCliente);
    }
    await cliente.save();

    res.status(201).send(cliente);
}
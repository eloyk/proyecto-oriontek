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
    
    const validarDireccionCliente = await DireccionCliente.findOne({direccion});

    if (validarDireccionCliente) {
      throw new SolicitudIncorrecta('Esta descripcion esta agregada, favor intentar nuevamente');
    }

    const direccionCliente = DireccionCliente.build({
      direccion,
      usuarioIdAlta: req.usuarioActual!.id,
      emailUsuarioAlta: req.usuarioActual!.email,
    })
    await direccionCliente.save();
    
    let cliente = await Cliente.findOne({ correoElectronico, tipoDocumento, numeroDocumento }).populate('direccionCliente');

    if (!cliente) {
      const empresa = await Empresa.findOne({nombreEmpresa: 'Empresa X'});

      cliente = Cliente.build({ 
        nombres,
        apellidos,
        telefono,
        empresaId: empresa!.id,
        correoElectronico,
        tipoDocumento,
        numeroDocumento,
        direccionCliente:[direccionCliente],
        usuarioIdAlta: req.usuarioActual!.id,
        emailUsuarioAlta: req.usuarioActual!.email ,
      });
      await cliente.save();

      }else{

        cliente.direccionCliente!.push(direccionCliente);
      }


    res.status(201).send(cliente);
}
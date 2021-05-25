import { Request, Response } from 'express';
import { SolicitudIncorrecta } from '../../errores/solicitud-incorrecta';
import { Cliente } from '../../models/cliente';
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

    const clienteExiste = await Cliente.findOne({ correoElectronico });

    if (clienteExiste) {
      throw new SolicitudIncorrecta('El correo electronico ya esta asociado a una cuenta existente');
    }

    const empresa = await Empresa.findOne({nombreEmpresa: 'Empresa X'});

    const cliente = Cliente.build({ 
      nombres,
      apellidos,
      telefono,
      empresaId: empresa!.id,
      correoElectronico,
      tipoDocumento,
      numeroDocumento,
      usuarioIdAlta: req.usuarioActual!.id,
      emailUsuarioAlta: req.usuarioActual!.email ,
    });
    await cliente.save();

    res.status(201).send(cliente);
}
import { Request, Response } from 'express';
import { SolicitudIncorrecta } from '../../errores/solicitud-incorrecta';
import { Empresa } from '../../models/empresa';

export const registrarEmpresa = async (req: Request, res: Response) => {
    const { 
      nombreEmpresa,
      duenio,
      telefono,
      emailEmpresa
    } = req.body;

    const EmpresaExiste = await Empresa.findOne({ nombreEmpresa, duenio, usuarioIdAlta: req.usuarioActual!.id });

    if (EmpresaExiste) {
      throw new SolicitudIncorrecta('Esta Empresa ya fue creada');
    }

    const empresa = Empresa.build({ 
      nombreEmpresa,
      duenio,
      telefono,
      emailEmpresa,
      usuarioIdAlta: req.usuarioActual!.id,
      emailUsuarioAlta: req.usuarioActual!.email 
    });
    await empresa.save();

    res.status(201).send(empresa);
  }
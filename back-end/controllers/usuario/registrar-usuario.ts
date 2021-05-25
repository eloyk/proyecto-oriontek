import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {SolicitudIncorrecta} from '../../errores/solicitud-incorrecta'
import { Usuario } from '../../models/usuario';
import config from '../../config/config'

export const registrarUsuario = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const usuarioExiste = await Usuario.findOne({ email });

    if (usuarioExiste) {
      if (!usuarioExiste!.estadoUsuario) {
        throw new SolicitudIncorrecta('Este usuario fue dado de baja');
      }
      throw new SolicitudIncorrecta('Email en uso');
    }

    const usuario = Usuario.build({ email, password });
    await usuario.save();

    const usuarioJwt = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        superUsuario: usuario.superUsuario,
        estadoUsuario: usuario.estadoUsuario
      },
      config.jwtSecret
    );

    req.session = {
      jwt: usuarioJwt,
    };

    res.status(201).send(usuario);
  }

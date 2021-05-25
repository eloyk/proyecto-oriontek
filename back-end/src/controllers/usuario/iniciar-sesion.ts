import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {SolicitudIncorrecta} from '../../errores/solicitud-incorrecta'

import { Password } from '../../services/password';
import { Usuario } from '../../models/usuario';
import config from '../../config/config'


export const iniciarSesion = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const usuarioExiste = await Usuario.findOne({ email, estadoUsuario: true });

    if (!usuarioExiste) {
      throw new SolicitudIncorrecta('credenciales invalidas');
    }

    const passwordsMatch = await Password.compare(
      usuarioExiste.password,
      password
    );
    
    if (!passwordsMatch) {
      throw new SolicitudIncorrecta('credenciales invalidas');
    }

    // Generate JWT
    const usuarioJwt = jwt.sign(
      {
        id: usuarioExiste.id,
        email: usuarioExiste.email,
        superUsuario: usuarioExiste.superUsuario,
        estadoUsuario: usuarioExiste.estadoUsuario
      },
      config.jwtSecret
    );

    // Store it on session object
    req.session = {
      jwt: usuarioJwt,
    };

    res.status(200).send(usuarioExiste);
  }

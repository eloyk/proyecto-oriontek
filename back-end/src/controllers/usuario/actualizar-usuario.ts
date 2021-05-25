import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorNoEncontrado } from '../../errores/error-no-encontrado';
import { SolicitudIncorrecta } from '../../errores/solicitud-incorrecta'
import { Usuario } from '../../models/usuario';
import config from '../../config/config'


export const actualizarUsuario = async (req: Request, res: Response) => {
    const usuario = await Usuario.findById(req.params.id);
    const usuarioSolicitante = await Usuario.findById(req.usuarioActual!.id);

    if (!usuario) {
      throw new ErrorNoEncontrado();
    }
    if (!usuarioSolicitante!.superUsuario) {
      throw new SolicitudIncorrecta('El usuario no es super usuario');
    }
    usuario.set({
      superUsuario: req.body.superUsuario,
    });
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



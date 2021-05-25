import express from 'express';
import { body } from 'express-validator';
import { actualizarUsuario } from '../controllers/usuario/actualizar-usuario';
import { cerrarsesion } from '../controllers/usuario/cerrar-sesion';
import { validarSolicitud } from '../middlewares/validar-solicitud';
import { requireAuth } from '../middlewares/autorizacion-requerida';
import { indexUsuario } from '../controllers/usuario';
import { iniciarSesion } from '../controllers/usuario/iniciar-sesion';
import { registrarUsuario } from '../controllers/usuario/registrar-usuario';
import { usuarioActual as usuarioActualMethod } from '../controllers/usuario/usuario-actual';
import { usuarioActual } from '../middlewares/usuario-actual';

const router = express.Router();

router.post(
  '/api/usuario/registrousuario',
  [
    body('email').isEmail().withMessage('El Email no es valido'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage(
        'La contrseña debe contener una minima de 4 caracteres y maxima de 20'
      ),
  ],
  validarSolicitud,
  registrarUsuario
);

router.post(
  '/api/usuario/iniciarsesion',
  [
    body('email').isEmail().withMessage('El Email no es valido'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Debes proporcionar una contraseña'),
  ],
  validarSolicitud,
  iniciarSesion
);

router.put(
  '/api/usuario/:id', 
  validarSolicitud, 
  actualizarUsuario
);

router.get(
  '/api/usuario', 
  requireAuth, 
  indexUsuario
);

router.get(
  '/api/usuario/usuarioactual', 
  usuarioActual, 
  usuarioActualMethod
);

router.post(
  '/api/usuario/cerrarsesion', 
  cerrarsesion
);

export { router as usuarioRouter };

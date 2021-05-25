import express from "express";
import { body } from "express-validator";
import { indexCliente } from "../controllers/cliente";
import { actualizarCliente } from "../controllers/cliente/actualizar-cliente";
import { registrarCliente } from "../controllers/cliente/crear-cliente";
import { eliminarCliente } from "../controllers/cliente/eliminar-cliente";
import { verCliente } from "../controllers/cliente/ver-cliente";
import { requireAuth } from "../middlewares/autorizacion-requerida";
import { validarSolicitud } from "../middlewares/validar-solicitud";


const router = express.Router();

router.post(
  '/api/cliente/registrar',
  requireAuth,
  [
    body('nombres')
      .trim()
      .isLength({ min: 4, max: 160 })
      .withMessage('Su nombre debe contener minimo de 4 caracteres y maxima de 160'),
    body('apellidos')
      .trim()
      .isLength({ min: 4, max: 160 })
      .withMessage(
        'Su apellido debe contener minimo de 4 caracteres y maxima de 160'
      ),
  ],
  validarSolicitud,
  registrarCliente
);

router.put(
  '/api/cliente/actualizar/:id',
  requireAuth,
  actualizarCliente
);
router.put(
  '/api/cliente/eliminar/:id',
  requireAuth,
  eliminarCliente
);

router.get(
  '/api/cliente', 
  requireAuth, 
  indexCliente
);

router.get(
  '/api/cliente/:id',
  requireAuth,
  verCliente
)

export { router as clienteRouter };

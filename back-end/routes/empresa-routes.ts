import express from "express";
import { body } from "express-validator";
import { indexEmpresa } from "../controllers/empresa";
import { actualizarEmpresa } from "../controllers/empresa/actualizar-empresa";
import { registrarEmpresa } from "../controllers/empresa/crear-empresa";
import { verEmpresa } from "../controllers/empresa/ver-empresa";
import { requireAuth } from "../middlewares/autorizacion-requerida";
import { validarSolicitud } from "../middlewares/validar-solicitud";

const router = express.Router();

router.post(
  '/api/empresa/registrar',
  requireAuth,
  [
    body('nombreEmpresa')
      .trim()
      .isLength({ min: 4, max: 160 })
      .withMessage('El nombre de la empresa no es valido'),
      body('duenio')
      .trim()
      .isLength({ min: 4, max: 60 })
      .withMessage(
        'El nombre del dueño de la empresa debe contener minimo de 4 caracteres y maxima de 60'
      ),
  ],
  validarSolicitud,
  registrarEmpresa
)
router.put(
  '/api/empresa/:id',
  requireAuth,
  actualizarEmpresa
)

router.get(
  '/api/empresa', 
  requireAuth, 
  indexEmpresa
)

router.get(
  '/api/empresa/:id',
  requireAuth,
  verEmpresa
)
    
export { router as empresaRouter };

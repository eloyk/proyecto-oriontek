import express from "express";
import { indexDireccionCliente } from "../controllers/direccion-cliente";
import { actualizarDireccionCliente } from "../controllers/direccion-cliente/actualizar-direccion-cliente";
import { verDireccionCliente } from "../controllers/direccion-cliente/ver-direccion-cliente";
import { eliminarDireccionCliente } from "../controllers/direccion-cliente/eliminar-direccion-cliente";
import { requireAuth } from "../middlewares/autorizacion-requerida";


const router = express.Router();

router.put(
  '/api/direccion-cliente/actualizar/:id',
  requireAuth,
  actualizarDireccionCliente
);

router.put(
  '/api/direccion-cliente/eliminar/:id',
  requireAuth,
  eliminarDireccionCliente
);

router.get(
  '/api/direccion-cliente', 
  requireAuth, 
  indexDireccionCliente
);

router.get(
  '/api/direccion-cliente/:id',
  requireAuth,
  verDireccionCliente
)

export { router as direccionClienteRouter };

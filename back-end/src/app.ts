import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { usuarioActual } from './middlewares/usuario-actual'
import { ErrorNoEncontrado } from './errores/error-no-encontrado'
import { controladorError } from './middlewares/controlador-error'

import { clienteRouter } from './routes/cliente-routes';
import { direccionClienteRouter } from './routes/direccion-cliente-routes';
import { empresaRouter } from './routes/empresa-routes';
import { usuarioRouter } from './routes/usuario-routes';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    //secure: process.env.NODE_ENV !== 'test',
    secure: false,
  })
);

app.use(usuarioActual);

//Routes cliente
app.use(clienteRouter);

//Routes direcciones del clienteRouter
app.use(direccionClienteRouter);

//Routes Empresa
app.use(empresaRouter);

//Routes Usuario
app.use(usuarioRouter);

app.all('*', async (req, res) => {
  throw new ErrorNoEncontrado();
});

app.use(controladorError);

export { app };

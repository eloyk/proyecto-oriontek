import { ValidationError } from 'express-validator';
import { ErrorPersonalizado } from './error-personalizado';

export class ErrorValidacionSolicitud extends ErrorPersonalizado {
  statusCode = 400;

  constructor(public errores: ValidationError[]) {
    super('Parametros de la solicitud invalidos');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, ErrorValidacionSolicitud.prototype);
  }

  serializarErrores() {
    return this.errores.map((err) => {
      return { mensaje: err.msg, campo: err.param };
    });
  }
}

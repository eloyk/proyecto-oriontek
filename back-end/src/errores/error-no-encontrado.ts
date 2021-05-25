import { ErrorPersonalizado } from './error-personalizado';

export class ErrorNoEncontrado extends ErrorPersonalizado {
  statusCode = 404;

  constructor() {
    super('Pagina no encotrada');

    Object.setPrototypeOf(this, ErrorNoEncontrado.prototype);
  }

  serializarErrores() {
    return [{ mensaje: 'Pagina no encontrada' }];
  }
}

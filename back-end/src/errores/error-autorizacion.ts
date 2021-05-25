import { ErrorPersonalizado } from './error-personalizado';

export class ErrorAutorizacion extends ErrorPersonalizado {
  statusCode = 401;

  constructor() {
    super('no posee autorizacion');

    Object.setPrototypeOf(this, ErrorAutorizacion.prototype);
  }

  serializarErrores() {
    return [{ mensaje: 'no posee autorizacion' }];
  }
}

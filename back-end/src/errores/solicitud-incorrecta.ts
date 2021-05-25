import { ErrorPersonalizado } from './error-personalizado';

export class SolicitudIncorrecta extends ErrorPersonalizado {
  statusCode = 400;

  constructor(public mensaje: string) {
    super(mensaje);

    Object.setPrototypeOf(this, SolicitudIncorrecta.prototype);
  }

  serializarErrores() {
    return [{ mensaje: this.mensaje }];
  }
}

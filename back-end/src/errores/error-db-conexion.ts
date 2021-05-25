import { ErrorPersonalizado } from './error-personalizado';

export class ErroDbConexion extends ErrorPersonalizado {
  statusCode = 500;
  razon = 'Error al intentar conectar a la base de datos';

  constructor() {
    super('Error al intentar conectarse a la db');

    Object.setPrototypeOf(this, ErroDbConexion.prototype);
  }

  serializarErrores() {
    return [{ mensaje: this.razon }];
  }
}

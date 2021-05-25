export abstract class ErrorPersonalizado extends Error {
  abstract statusCode: number;

  constructor(mensaje: string) {
    super(mensaje);

    Object.setPrototypeOf(this, ErrorPersonalizado.prototype);
  }

  abstract serializarErrores(): { mensaje: string; campo?: string }[];
}

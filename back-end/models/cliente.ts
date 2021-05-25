import mongoose from 'mongoose';
import { DocumentoDireccionCliente } from './direccion-cliente';

interface AtribCliente {
  nombres: string;
  apellidos: string;
  telefono?: string;
  empresaId: string;
  correoElectronico?: string;
  tipoDocumento?: string;
  numeroDocumento?: string;
  manejadorPrecio?: [DocumentoDireccionCliente];  
  usuarioIdAlta?: string;
  emailUsuarioAlta?: string;
  fechaAlta?: Date;
  estado?: boolean;
}

interface DocumentoCliente extends mongoose.Document {
  nombres: string;
  apellidos: string;
  telefono?: string;
  empresaId: string;
  correoElectronico?: string;
  tipoDocumento?: string;
  numeroDocumento?: string;
  manejadorPrecio?: [DocumentoDireccionCliente];  
  usuarioIdAlta?: string;
  emailUsuarioAlta?: string;
  fechaAlta?: Date;
  estado?: boolean;
}

interface ModeloCliente extends mongoose.Model<DocumentoCliente> {
  build(atrib: AtribCliente): DocumentoCliente;
}

const SchemaCliente = new mongoose.Schema(
  {
    nombres: {
      type: String,
      required: true,
      lowercase: true,
    },
    apellidos: {
      type: String,
      required: true,
      lowercase: true,
    },
    telefono: {
      type: String,
    },
    empresaId: {
      type: String,
      required: true,
    },
    correoElectronico: {
      type: String,
    },
    tipoDocumento: {
      type: String,
    },
    numeroDocumento: {
      type: String,
    },
    manejadorPrecio: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ManejadorPrecio',
      },
    ],
    usuarioIdAlta: {
      type: String,
    },
    emailUsuarioAlta: {
      type: String,
    },
    fechaAlta: {
      type: mongoose.Schema.Types.Date,
      default: Date.now,
    },
    estado: {
      type: Boolean,
      default: true
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

SchemaCliente.statics.build = (atrib: AtribCliente) => {
  return new Cliente(atrib);
};

const Cliente = mongoose.model<DocumentoCliente, ModeloCliente>(
  'Cliente',
  SchemaCliente
);

export { Cliente };

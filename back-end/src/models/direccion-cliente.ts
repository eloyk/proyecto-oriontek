import mongoose from 'mongoose';

interface AtribDireccionCliente {
  direccion: string;
  usuarioIdAlta?: string;
  emailUsuarioAlta?: string;
  fechaAlta?: Date;
  estado?: boolean;
}

export interface DocumentoDireccionCliente extends mongoose.Document {
  direccion: string;
  usuarioIdAlta?: string;
  emailUsuarioAlta?: string;
  fechaAlta?: Date;
  estado?: boolean;
}

interface ModeloDireccionCliente extends mongoose.Model<DocumentoDireccionCliente> {
  build(atrib: AtribDireccionCliente): DocumentoDireccionCliente;
}

const SchemaDireccionCliente = new mongoose.Schema(
  {
    direccion: {
      type: String,
      required: true,
      lowercase: true,
    },
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

SchemaDireccionCliente.statics.build = (atrib: AtribDireccionCliente) => {
  return new DireccionCliente(atrib);
};

const DireccionCliente = mongoose.model<DocumentoDireccionCliente, ModeloDireccionCliente>(
  'DireccionCliente',
  SchemaDireccionCliente
);

export { DireccionCliente };

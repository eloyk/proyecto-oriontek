import mongoose from 'mongoose';

interface AtribEmpresa {
  nombreEmpresa: string;
  duenio: string;
  telefono?: string;
  emailEmpresa?: string;
  usuarioIdAlta?: string;
  emailUsuarioAlta?: string;
  fechaAlta?: Date;
}

interface DocumentoEmpresa extends mongoose.Document {
  nombreEmpresa: string;
  duenio: string;
  telefono?: string;
  emailEmpresa?: string;
  usuarioIdAlta?: string;
  emailUsuarioAlta?: string;
  fechaAlta?: Date;
}

interface ModeloEmpresa extends mongoose.Model<DocumentoEmpresa> {
  build(atrib: AtribEmpresa): DocumentoEmpresa;
}

const SchemaEmpresa = new mongoose.Schema(
  {
    nombreEmpresa: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    duenio: {
      type: String,
      default: true,
    },
    telefono: {
      type: String,
    },
    emailEmpresa: {
      type: String,
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

SchemaEmpresa.statics.build = (atrib: AtribEmpresa) => {
  return new Empresa(atrib);
};

const Empresa = mongoose.model<DocumentoEmpresa, ModeloEmpresa>(
  'Empresa',
  SchemaEmpresa
);

export { Empresa };

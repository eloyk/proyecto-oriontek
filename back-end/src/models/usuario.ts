import mongoose from 'mongoose';
import { Password } from '../services/password';

interface AtribUsuario {
  email: string;
  password: string;
  superUsuario?: boolean;
  estadoUsuario?: boolean;
}

interface DocumentoUsuario extends mongoose.Document {
  email: string;
  password: string;
  superUsuario?: boolean;
  estadoUsuario?: boolean;
}

interface ModeloUsuario extends mongoose.Model<DocumentoUsuario> {
  build(atrib: AtribUsuario): DocumentoUsuario;
}

const SchemaUsuario = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
    },
    superUsuario: {
      type: Boolean,
      default: false,
    },
    estadoUsuario: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

SchemaUsuario.pre('save', async function(this: any, done: any) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

SchemaUsuario.statics.build = (atrib: AtribUsuario) => {
  return new Usuario(atrib);
};

const Usuario = mongoose.model<DocumentoUsuario, ModeloUsuario>(
  'Usuario',
  SchemaUsuario
);

export { Usuario };

import mongoose from 'mongoose';
import MUUID from 'uuid-mongodb';

const CEPschema = new mongoose.Schema(
  {
    _id: {
      type: 'object',
      value: { type: 'Buffer' },
      default: () => MUUID.v4().toString()
    },
    cep: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'PENDENTE'
    },
    data: { 
      cep: String, 
      logradouro: String,
      complemento: String,
      bairro: String,
      localidade: String,
      uf: String,
      ibge: String,
      gia: String,
      ddd: String,
      siafi: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
)
export const CEPModel = mongoose.model('CEP', CEPschema)

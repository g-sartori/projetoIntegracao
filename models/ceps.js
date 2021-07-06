import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    cep: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    data: { 
      cep: String, 
      logradouro: String,
      complemento: String,
      bairro: String,
      localidade: String,
      uf: String,
      unidade: String,
      ibge: String,
      gia: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
)
export const CEPModel = mongoose.model('CEP', schema)

import { CEPModel } from '../models/ceps'
import * as yup from 'yup';

class CreateCEPService {
  async execute({ req, res, cep }) {
    console.log('\nEntrou no create cep');
    const schema = yup.object().shape({
      cep: yup.string().required()
    });
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      console.log('Deu erro na validação do yup');
      return res.send(400, err);;
    }
    if (isNaN(cep)) {
      console.log('Deu erro na validação isNaN do cep');
      return res.send(400, 'Digite apenas números no CEP');
    }
    const cepLength = cep.length;
    if (cepLength !== 8) {
      console.log('Deu erro na validação de tamanho do cep');
      return res.send(400, 'O CEP deve ter 8 caracteres');
    }
    const cepAlreadyExists = await CEPModel.findOne({
      cep: cep
    });   
    if (cepAlreadyExists) {
      console.log('CEP já cadastrado, retornar situação atual');
      return res.send(200, cepAlreadyExists);
    }else{
      const newCEP = await CEPModel.create({ cep });
      console.log('Novo CEP cadastrado no DB')
      return res.send(201, newCEP);
    }
  }
}

export { CreateCEPService };
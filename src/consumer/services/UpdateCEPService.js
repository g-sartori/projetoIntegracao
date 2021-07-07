import { CEPModel } from '../../producer/models/ceps';
import fetch from 'node-fetch'

class UpdateCEPService {
  async execute(cepId) {
    console.log('\nEntrou no update CEP service');
    console.log(cepId)
    const {status, cep} = await CEPModel.findOne({
      _id: cepId
    });
    console.log('status');
    console.log(status);
    console.log('cep');
    console.log(cep);

    if(status==='PENDENTE'){
      console.log('\nEntrou no Pendente');
      fetch(`https://viacep.com.br/ws/${cep}/json/`).then(function (response) {
        return response.json();
      }).then(async function (data) {
        if (data.erro != true) {
          console.log('O CEP %s entrou no CONCLUIDO do fetch, dados do fetch:', cep)
          console.log(data);

          const newCEP = await CEPModel.findOneAndUpdate(
            {
              _id: cepId
            }, {
              data: data,
              status: 'CONCLUÍDO'
            }, {
              new: true
            }
          )
          console.log('Dados do CEP atualizados:');
          console.log(newCEP);
        } else {
          console.log('O CEP %s entrou no REJEITADO do fetch, dados do fetch:', cep)
          console.log(data);
          const newCEP = await CEPModel.findOneAndUpdate(
            {
              _id: cepId
            }, {
              data: data,
              status: 'REJEITADO'
            }, {
              new: true
            }
          )
          console.log('CEP não encontrado, dados da collection atualizados:');
          console.log(newCEP);
        }
      });
    }
    console.log('Fim do UPDATE CEP SERVICE\n');
    return status;
    
  }
}

export { UpdateCEPService };
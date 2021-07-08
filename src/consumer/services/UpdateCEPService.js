const CEPModel = require('../../producer/models/ceps');
const fetch = require('node-fetch');

class UpdateCEPService {
  async execute(cepId) {
    const {status, cep} = await CEPModel.findOne({
      _id: cepId
    });
    if(status==='PENDENTE'){
      fetch(`https://viacep.com.br/ws/${cep}/json/`).then(function (response) {
        return response.json();
      }).then(async function (data) {
        if (data.erro != true) {
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
          console.log('Dados do CEP:%s atualizados:', cep);
          console.log(newCEP);
        } else {
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
          console.log('CEP:%s não encontrado na API, dados da collection atualizados:',cep);
          console.log(newCEP);
        }
      });
    }
    return
  }
}

module.exports = UpdateCEPService
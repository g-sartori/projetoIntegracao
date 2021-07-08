const request = require('supertest');
const server = require('../src/setup/server');
const app = require('../src/producer/index.js');
const mongoose = require('../src/setup/db');

jest.setTimeout(30000);

afterAll(async () => {
  await mongoose.disconnect();
});

describe('CreateCEPService: Receber um CEP e criar o registro no DB ', () => {
  it('Validar o tamanho do CEP (8 caracteres)', async () => {
    const data = { cep: '8702027' };
    const response = await request(server)
      .post('/cep')
      .send({
        cep: data.cep
      });
    expect(response.status).toBe(400);
  });
  it('Validar o formato do CEP (apenas números)', async () => {
    const data = { cep: 'XX0202XX' };
    const response = await request(server)
      .post('/cep')
      .send({
        cep: data.cep
      });
    expect(response.status).toBe(400);
  });
  it('Criar um novo registro de CEP no Banco', async () => {
    const data = { cep: '87020270' };
    const response = await request(server)
      .post('/cep')
      .send({
        cep: data.cep
      });
      // esse teste retorna falha caso o data.cep já esteja cadastrado no banco
    expect(response.status).toBe(201);
  });
  it('Encontrar e Retornar um CEP quando já cadastrado', async () => {
    const data = { cep: '87020270' };
    const response = await request(server)
      .post('/cep')
      .send({
        cep: data.cep
      });
    expect(response.status).toBe(200);
  });
});
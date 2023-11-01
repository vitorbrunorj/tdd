/* eslint-disable implicit-arrow-linebreak */
const request = require('supertest');
const app = require('../../src/app');

test('Deve listar todos os usuários', () =>
  request(app)
    .get('/users')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    }));

test('Deve inserir usuários com sucesso', () => {
  const mail = `${Date.now()}@email.com`;

  return request(app)
    .post('/users')
    .send({
      name: 'Rafael Suares',
      mail,
      passwd: '123456',
    })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Rafael Suares');
    });
});

test('Não deve inserir usuário sem nome', () =>
  request(app)
    .post('/users')
    .send({
      mail: 'padrao@gmail.com',
      passwd: '123456',
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nome é um atributo obrigatório');
    }));

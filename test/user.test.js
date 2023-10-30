/* eslint-disable implicit-arrow-linebreak */
const request = require('supertest');
const app = require('../src/app');

test('Deve listar todos os usuários', () =>
  request(app)
    .get('/users')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toHaveProperty('name', 'Vitor Bruno');
    }));

test('Deve inserir usuários com sucesso', () =>
  request(app)
    .post('/users')
    .send({ name: 'Rafael Suares', email: 'rafael@gmail.com' })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Rafael Suares');
    }));

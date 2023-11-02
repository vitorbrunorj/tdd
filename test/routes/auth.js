const request = require('supertest');
const app = require('../../src/app');

test('Deve receber ', async () => {
  const res = await request(app).post('/users').send({
    mail: 'padrado@gmail.com',
    passwd: '123456',
  });

  expect(res.status).toBe(400);
  expect(res.body.error).toBe('Nome é um atributo obrigatório');
});

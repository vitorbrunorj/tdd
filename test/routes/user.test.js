/* eslint-disable implicit-arrow-linebreak */
const request = require('supertest');
const app = require('../../src/app');

const mail = `${Date.now()}@email.com`;

test('Deve listar todos os usuários', async () => {
  const result = await request(app).get('/users');

  expect(result.status).toBe(200);
  expect(result.body.length).toBeGreaterThan(0);
});

test('Deve inserir usuários com sucesso', async () => {
  const result = await request(app).post('/users').send({
    name: 'Rafael Suares',
    mail,
    passwd: '123456',
  });

  expect(result.status).toBe(201);
  expect(result.body.name).toBe('Rafael Suares');
});

test('Não deve inserir usuário sem nome', async () => {
  const result = await request(app).post('/users').send({
    mail: 'padrao@gmail.com',
    passwd: '123456',
  });

  expect(result.status).toBe(400);
  expect(result.body.error).toBe('Nome é um atributo obrigatório');
});

test('Não deve inserir usuário sem email', async () => {
  const result = await request(app).post('/users').send({
    name: 'Rafael Suares',
    passwd: '123456',
  });
  expect(result.status).toBe(400);
  expect(result.body.error).toBe('Email é um atributo obrigatório');
});

test('Não deve inserir usuário sem senha', async () => {
  const result = await request(app).post('/users').send({
    name: 'Rafael Suares',
    mail: 'padrao@gmail.com',
  });
  expect(result.status).toBe(400);
  expect(result.body.error).toBe('Senha é um atributo obrigatório');
});

test('Não deve inserir usuário com email existente', async () => {
  const result = await request(app).post('/users').send({
    name: 'Rafael Suares',
    mail,
    passwd: '123456',
  });

  expect(result.status).toBe(400);
  expect(result.body.error).toBe('Já existe um usuário com esse email');
});

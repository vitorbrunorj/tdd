/* eslint-disable implicit-arrow-linebreak */
const request = require('supertest');
const app = require('../../src/app');

const mail = `${Date.now()}@email.com`;

test('Deve listar todos os usuários', async () => {
  const res = await request(app).get('/users');

  expect(res.status).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
});

test('Deve inserir usuários com sucesso', async () => {
  const res = await request(app).post('/users').send({
    name: 'Rafael Suares',
    mail,
    passwd: '123456',
  });

  expect(res.status).toBe(201);
  expect(res.body.name).toBe('Rafael Suares');
});

test('Não deve inserir usuário sem nome', async () => {
  const res = await request(app).post('/users').send({
    mail: 'padrao@gmail.com',
    passwd: '123456',
  });

  expect(res.status).toBe(400);
  expect(res.body.error).toBe('Nome é um atributo obrigatório');
});

test('Não deve inserir usuário sem email', async () => {
  const res = await request(app).post('/users').send({
    name: 'Rafael Suares',
    passwd: '123456',
  });
  expect(res.status).toBe(400);
  expect(res.body.error).toBe('Email é um atributo obrigatório');
});

test('Não deve inserir usuário sem senha', async () => {
  const res = await request(app).post('/users').send({
    name: 'Rafael Suares',
    mail: 'padrao@gmail.com',
  });
  expect(res.status).toBe(400);
  expect(res.body.error).toBe('Senha é um atributo obrigatório');
});

test('Não deve inserir usuário com email existente', async () => {
  const res = await request(app).post('/users').send({
    name: 'Rafael Suares',
    mail,
    passwd: '123456',
  });

  expect(res.status).toBe(400);
  expect(res.body.error).toBe('Já existe um usuário com esse email');
});

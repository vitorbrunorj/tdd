/* eslint-disable implicit-arrow-linebreak */
const ValidationError = require('../../src/errors/ValidationError');
const jwt = require('jwt-simple');
const request = require('supertest');
const app = require('../../src/app');

const mail = `${Date.now()}@email.com`;

let user;

beforeAll(async () => {
  const res = await app.services.user.save({
    name: 'User account',
    mail: `${Date.now()}@email.com`,
    passwd: '123456',
  });
  user = { ...res[0] };
  user.token = jwt.encode(user, 'Segredo!');
});

test('Deve listar todos os usuários', async () => {
  const res = await request(app)
    .get('/users')
    .set('authorization', `Bearer ${user.token}`);

  expect(res.status).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
});

test('Deve inserir usuários com sucesso', async () => {
  const res = await request(app)
    .post('/users')
    .set('authorization', `Bearer ${user.token}`)
    .send({
      name: 'Rafael Suares',
      mail,
      passwd: '123456',
    });

  expect(res.status).toBe(201);
  expect(res.body.name).toBe('Rafael Suares');
  expect(res.body).not.toHaveProperty('passwd');
});

test('Deve armazenar senha criptografada', async () => {
  const res = await request(app)
    .post('/users')
    .set('authorization', `Bearer ${user.token}`)
    .send({
      name: 'Rafael Suares',
      mail: `${Date.now()}@email.com`,
      passwd: '123456',
    });

  expect(res.status).toBe(201);

  const { id } = res.body;
  const userDB = await app.services.user.findOne({ id });

  expect(userDB.passwd).not.toBeUndefined();
  expect(userDB.passwd).not.toBe('123456');
});

test('Não deve inserir usuário sem nome', async () => {
  const res = await request(app)
    .post('/users')
    .set('authorization', `Bearer ${user.token}`)
    .send({
      mail: 'padrado@gmail.com',
      passwd: '123456',
    });

  expect(res.status).toBe(400);
  expect(res.body.error).toBe('Nome é um atributo obrigatório');
});

test('Não deve inserir usuário sem email', async () => {
  const res = await request(app)
    .post('/users')
    .set('authorization', `Bearer ${user.token}`)
    .send({
      name: 'Rafael Suares',
      passwd: '123456',
    });
  expect(res.status).toBe(400);
  expect(res.body.error).toBe('Email é um atributo obrigatório');
});

test('Não deve inserir usuário sem senha', async () => {
  const res = await request(app)
    .post('/users')
    .set('authorization', `Bearer ${user.token}`)
    .send({
      name: 'Rafael Suares',
      mail: 'padrao@gmail.com',
    });
  expect(res.status).toBe(400);
  expect(res.body.error).toBe('Senha é um atributo obrigatório');
});

test('Não deve inserir usuário com email existente', async () => {
  const res = await request(app)
    .post('/users')
    .set('authorization', `Bearer ${user.token}`)
    .send({
      name: 'Rafael Suares',
      mail,
      passwd: '123456',
    });

  expect(res.status).toBe(400);
  expect(res.body.error).toBe('Já existe um usuário com esse email');
});

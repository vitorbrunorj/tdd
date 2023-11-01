const request = require('supertest');
const app = require('../../src/app');

const MAIN_ROUTE = '/accounts';
let user;

beforeAll(async () => {
  const result = await app.services.user.save({
    name: 'User account',
    mail: `${Date.now()}@email.com`,
    passwd: '123456',
  });
  user = { ...result[0] };
});

test('Deve inserir uma conta com sucesso', async () => {
  const result = await request(app).post(MAIN_ROUTE).send({
    name: 'Acc #1',
    user_id: user.id,
  });

  expect(result.status).toBe(201);
  expect(result.body.name).toBe('Acc #1');
});
test('Deve listar todas as contas', async () => {
  await app.db('accounts').insert({
    name: 'Acc list',
    user_id: user.id,
  });

  const result = await request(app).get(MAIN_ROUTE);

  expect(result.status).toBe(200);
  expect(result.body.length).toBeGreaterThan(0);
});

test('Deve retornar uma conta por Id', async () => {
  const acc = await app
    .db('accounts')
    .insert({ name: 'Acc By Id', user_id: user.id }, ['id']);

  const result = await request(app).get(`${MAIN_ROUTE}/${acc[0].id}`);

  expect(result.status).toBe(200);
  expect(result.body.name).toBe('Acc By Id');
  expect(result.body.user_id).toBe(user.id);
});

/*
User
test('Deve retornar uma conta por Id', () => {
  return app.db('accounts');
  insert({ name: 'Acc By Id', user_id: user.id }, ['id'])
    .then((acc) => request(app).get(`${MAIN_ROUTE}/${acc[0].id}`))
    .then((res) => {
      expect(result.status).toBe(200);
      expect(result.body.name).toBe('Acc By Id');
      expect(result.body.user_id).toBe(user.id);
    });
});

 */

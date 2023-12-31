const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../src/app');

const MAIN_ROUTE = '/v1/accounts';
let user;
let user2;

beforeEach(async () => {
  const res = await app.services.user.save({
    name: 'User account',
    mail: `${Date.now()}@email.com`,
    passwd: '123456',
  });
  user = { ...res[0] };
  user.token = jwt.encode(user, 'Segredo!');

  const res2 = await app.services.user.save({
    name: 'User account #2',
    mail: `${Date.now()}@email.com`,
    passwd: '123456',
  });
  user2 = { ...res2[0] };
});

test('Deve inserir uma conta com sucesso', async () => {
  const result = await request(app)
    .post(MAIN_ROUTE)
    .set('authorization', `Bearer ${user.token}`)
    .send({
      name: 'Acc #1',
    });

  expect(result.status).toBe(201);
  expect(result.body.name).toBe('Acc #1');
});

test('Não deve inserir uma conta sem nome', async () => {
  const result = await request(app)
    .post(MAIN_ROUTE)
    .set('authorization', `Bearer ${user.token}`)
    .send({});

  expect(result.status).toBe(400);
  expect(result.body.error).toBe('Nome é um atributo obrigatório');
});

test('Não deve inserir uma conta de nome duplicado, para o mesmo usuário', async () => {
  await app.db('accounts').insert({ name: 'Acc Duplicado', user_id: user.id });

  const res = await request(app)
    .post(MAIN_ROUTE)
    .set('authorization', `Bearer ${user.token}`)
    .send({ name: 'Acc Duplicado' });

  expect(res.status).toBe(400);
  expect(res.body.error).toBe('Já existe uma conta com esse nome');
});

test('Deve listar apenas as contas do usuário', async () => {
  await app.db('accounts').insert([
    { name: 'Acc User #1', user_id: user.id },
    { name: 'Acc User #2', user_id: user2.id },
  ]);

  const res = await request(app)
    .get(MAIN_ROUTE)
    .set('authorization', `Bearer ${user.token}`);

  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
  expect(res.body[0].name).toBe('Acc User #1');
});

test('Deve retornar uma conta por Id', async () => {
  const acc = await app
    .db('accounts')
    .insert({ name: 'Acc By Id', user_id: user.id }, ['id']);

  const res = await request(app)
    .get(`${MAIN_ROUTE}/${acc[0].id}`)
    .set('authorization', `Bearer ${user.token}`);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe('Acc By Id');
  expect(res.body.user_id).toBe(user.id);
});

test('Não deve retornar uma conta de outro usuário', async () => {
  const acc = await app
    .db('accounts')
    .insert({ name: 'Acc User #2', user_id: user2.id }, ['id']);

  const res = await request(app)
    .get(`${MAIN_ROUTE}/${acc[0].id}`)
    .set('authorization', `Bearer ${user.token}`);

  expect(res.status).toBe(403);
  expect(res.body.error).toBe('Este recurso não pertence ao usuário');
});

test('Deve alterar a conta', async () => {
  const acc = await app
    .db('accounts')
    .insert({ name: 'Acc To Update', user_id: user.id }, ['id']);

  const res = await request(app)
    .put(`${MAIN_ROUTE}/${acc[0].id}`)
    .set('authorization', `Bearer ${user.token}`)
    .send({ name: 'Acc Updated' });

  expect(res.status).toBe(200);
  expect(res.body.name).toBe('Acc Updated');
});

test('Não deve alterar uma conta de outro usuário', async () => {
  const acc = await app
    .db('accounts')
    .insert({ name: 'Acc User #2', user_id: user2.id }, ['id']);

  const res = await request(app)
    .put(`${MAIN_ROUTE}/${acc[0].id}`)
    .set('authorization', `Bearer ${user.token}`)
    .send({ name: 'Acc Updated' });

  expect(res.status).toBe(403);
  expect(res.body.error).toBe('Este recurso não pertence ao usuário');
});

test('Deve remover uma conta', async () => {
  const acc = await app
    .db('accounts')
    .insert({ name: 'Acc To Remove', user_id: user.id }, ['id']);

  const res = await request(app)
    .delete(`${MAIN_ROUTE}/${acc[0].id}`)
    .set('authorization', `Bearer ${user.token}`);

  expect(res.status).toBe(204);
});

test('Não deve remover uma conta de outro usuário', async () => {
  const acc = await app
    .db('accounts')
    .insert({ name: 'Acc User #2', user_id: user2.id }, ['id']);

  const res = await request(app)
    .delete(`${MAIN_ROUTE}/${acc[0].id}`)
    .set('authorization', `Bearer ${user.token}`);

  expect(res.status).toBe(403);
  expect(res.body.error).toBe('Este recurso não pertence ao usuário');
});

/*


test('Deve remover uma conta', () =>
  app
    .db('accounts')
    .insert({ name: 'Acc To Remove', idesr_id: user.id }, { id })
    .then((acc) => request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`))
    .then((res) => {
      expect(res.status).toBe(204);

    });

});

test('Deve alterar a conta', () =>
  app
    .db('accounts')
    .insert({ name: 'Acc To Update', user_id: user.id }, ['id'])
    .then((acc) =>
      request(app)
        .put(`${MAIN_ROUTE}/${acc[0].id}`)
        .send({ name: 'Acc Updated' }),
    )
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Acc Updated');
    })); */

/* test('Deve alterar a conta', () => {
  return app.db('accounts');
  insert({ name: 'Acc By Id', user_id: user.id }, ['id'])
    .then((acc) => request(app).get(`${MAIN_ROUTE}/${acc[0].id}`))
    .then((res) => {
      expect(result.status).toBe(200);
      expect(result.body.name).toBe('Acc By Id');
      expect(result.body.user_id).toBe(user.id);
    });
}); */

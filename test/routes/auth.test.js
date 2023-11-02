const request = require('supertest');
const app = require('../../src/app');

test('Deve criar usuário via signup', async () => {
  const res = await request(app)
    .post('/auth/signup')
    .send({
      name: 'Walter',
      mail: `${Date.now()}@email.com`,
      passwd: '123456',
    });

  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty('mail');
  expect(res.body).not.toHaveProperty('passwd');
});

test('Deve receber token ao logar', async () => {
  const mail = `${Date.now()}@email.com`;

  await app.services.user.save({ name: 'Walter', mail, passwd: '123456' });

  const res = await request(app)
    .post('/auth/signin')
    .send({ mail, passwd: '123456' });

  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('token');
});

test('Não deve autenticar usuário com a senha errada', async () => {
  const mail = `${Date.now()}@email.com`;

  await app.services.user.save({ name: 'Walter', mail, passwd: '123456' });

  const res = await request(app)
    .post('/auth/signin')
    .send({ mail, passwd: '654321' });

  expect(res.status).toBe(400);
  expect(res.body.error).toBe('Usuário ou senha inválido');
});

test('Não deve autenticar usuário com email errado', async () => {
  const res = await request(app)
    .post('/auth/signin')
    .send({ mail: 'naoExiste@gmail.com', passwd: '654321' });

  expect(res.status).toBe(400);
  expect(res.body.error).toBe('Usuário ou senha inválido');
});

test('Não deve acessar uma rota protegida sem token', async () => {
  const res = await request(app).get('/v1/users');

  expect(res.status).toBe(401);
});

/* const request = require('supertest');
const app = require('../../src/app');

test('Deve criar usuário via signup', () => {
  return request(app).post('/auth/signin');
  send({ name: 'Walter', mail: `${Date.now()}@email.com`, passwd: '123456' });
  then((res) => {
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('mail');
    expect(res.body).not.toHaveProperty('passwd');
  });
});

test('Deve receber token ao logar', async () => {
  const mail = `${Date.now()}@email.com`;

  return app.services.user
    .save({ name: 'Walter', mail, passwd: '123456' })
    .then(() =>
      request(app).post('/auth/signin').send({ mail, passwd: '123456' }),
    )
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });
});

test('Não deve autenticar usuário com a senha errada', () => {
  const mail = `${Date.now()}@email.com`;

  return app.services.user
    .save({ name: 'Walter', mail, passwd: '123456' })
    .then(() =>
      request(app).post('/auth/signin').send({ mail, passwd: '654321' }),
    )
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Usuário ou senha inválido');
    });
});

test('Não deve autenticar usuário com email errado', () => {
  return request(app)
    .post('/auth/signin')
    .send({ mail: 'naoExiste@gmail.com', passwd: '654321' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Usuário ou senha inválido');
    });
});

test('Não deve acessar uma rota protegida sem token', () => {
  return request(app)
    .get('/users')
    .then((res) => {
      expect(res.status).toBe(401);
    });
});
 */

const request = require('supertest');
const app = require('../../src/app');

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

/* test('Deve receber token ao logar', async () => {
  const mail = `${Date.now()}@email.com`;

  await app.services.user.save({ name: 'Walter', mail, passwd: '123456' });

  const loginResponse = await request(app)
    .post('/auth/signin')
    .send({ mail, passwd: '123456' });

  expect(loginResponse.status).toBe(200);
  expect(loginResponse.body).toHaveProperty('token');
});

test('Não deve autenticar usuário com a senha errada', async () => {
  const mail = `${Date.now()}@email.com`;

  await app.services.user.save({ name: 'Walter', mail, passwd: '123456' });

  const loginResponse = await request(app)
    .post('/auth/signin')
    .send({ mail, passwd: '654321' });

  expect(loginResponse.status).toBe(400);
  expect(loginResponse.body.error).toBe('Usuário ou senha inválido');
});
 */

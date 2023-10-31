module.exports = {
  test: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'vitorbrunorj',
      password: 'vbbdeorj631228',
      database: 'financeiro',
    },
    migrations: {
      directory: 'src/migrations',
    },
  },
};

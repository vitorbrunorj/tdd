/* eslint-disable implicit-arrow-linebreak */

exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('mail').unique();
    table.string('passwd').notNullable();
  });

exports.down = (knex) => knex.schema.dropTable('users');

import knex from './connection.js';

const createTable = async () => {
  const tableExists = await knex.schema.hasTable('users');

  if (tableExists) {
    return;
  }

  await knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.text('username');
    table.text('access_token');
    table.text('refresh_token');
  });
};

const getById = async id => {
  const user = await knex.from('users').select().where('id', id);

  return user;
};

const add = async (username, access_token, refresh_token) => {
  await knex('users').insert({
    username,
    access_token,
    refresh_token
  });
};

export default {
  createTable,
  add,
  getById
};

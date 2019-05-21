const knex = require('knex');

const knexConfig = require('../knexfile');
// module.exports = knex(knexConfig);
const dbEnv = process.env.DB_ENV || 'development';

module.exports = knex(knexConfig[dbEnv]);
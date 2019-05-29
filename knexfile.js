require("dotenv").config();
const pg = require("pg");
pg.defaults.ssl = true;

const localPgConnection = {
  host: "localhost",
  database: "UserDB",
  user: "bookLover",
  password: "readingIsFun"
};

const prodDbConnection = process.env.DATABASE_URL || localPgConnection;

module.exports = {
  development: {

    client: 'pg',
    connection: prodDbConnection ,
    useNullAsDefault: true,


    migrations: {
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    }
  },
  production: {
    client: "pg",
    connection: prodDbConnection,
    migrations: {
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    }
  }
};

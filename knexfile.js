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
<<<<<<< HEAD
=======

>>>>>>> 0b03fec513429f933f5284723c338f7b677493f6
    client: 'pg',
    connection: prodDbConnection ,
    useNullAsDefault: true,

<<<<<<< HEAD
=======

>>>>>>> 0b03fec513429f933f5284723c338f7b677493f6
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

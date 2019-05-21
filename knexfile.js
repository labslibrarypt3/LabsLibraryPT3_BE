module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './DATA/lambda.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },
};
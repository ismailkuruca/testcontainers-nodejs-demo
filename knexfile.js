module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://localhost/postgres',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
  },
  development: {
    client: 'pg',
    connection: 'postgres://postgres:@localhost:32768/postgres',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
  },
}
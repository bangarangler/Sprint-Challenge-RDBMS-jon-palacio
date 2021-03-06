module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/projectTracker.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
      debug: true //TODO remove before deploying
    }
  }

  //staging: {
  //client: 'postgresql',
  //connection: {
  //database: 'my_db',
  //user:     'username',
  //password: 'password'
  //},
  //pool: {
  //min: 2,
  //max: 10
  //},
  //migrations: {
  //tableName: 'knex_migrations'
  //}
  //},

  //production: {
  //client: 'postgresql',
  //connection: {
  //database: 'my_db',
  //user:     'username',
  //password: 'password'
  //},
  //pool: {
  //min: 2,
  //max: 10
  //},
  //migrations: {
  //tableName: 'knex_migrations'
  //}
  //}
};

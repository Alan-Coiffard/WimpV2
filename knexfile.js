//Fichier de parametre pour la connection à la BDD

module.exports = {
  development: {
    client: process.env.DB_CLIENT_D,
    connection: {
      host: process.env.DB_HOST_D,
      port:  process.env.DB_PORT_D,
      user: process.env.DB_USER_D,
      password: process.env.DB_PASSWORD_D,
      database: process.env.DB_DATABASE_D
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
  staging: {
    client: 'pg',
    connection: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "root",
      database: "wimp"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: process.env.DB_CLIENT_D,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

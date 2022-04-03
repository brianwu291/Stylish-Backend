const { config } = require("dotenv");

config();

const env = {
  PORT: process.env.PORT,
  production: {
    database: {
      host: process.env.RDS_HOSTNAME,
      user: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      port: process.env.RDS_PORT,
      name: process.env.RDS_DB_NAME,
    },
    tokenSecret: process.env.TOKEN_SECRET,
  },
  development: {
    database: {
      host: process.env.developmentDbHost,
      user: process.env.developmentDbUser,
      password: process.env.developmentDbPassword,
      port: process.env.developmentDbPort,
      name: process.env.developmentDBName,
    },
    tokenSecret: process.env.TOKEN_SECRET,
  },
  test: {
    database: {
      host: process.env.RDS_HOSTNAME,
      user: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      port: process.env.RDS_PORT,
      name: process.env.RDS_DB_NAME,
    },
    tokenSecret: process.env.TOKEN_SECRET,
  },
};

function getEnv() {
  switch (process.env.NODE_ENV) {
    case "production":
      return env.prod;
    case "test":
      return env.test;
    case "development":
    default:
      return env.development;
  }
}

module.exports = {
  getEnv,
  env,
};

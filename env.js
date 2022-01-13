const { config } = require("dotenv");

config();

const env = {
  production: {
    database: {
      name: process.env.productionDBName,
      host: process.env.productionDbHost,
      user: process.env.productionDbUser,
      password: process.env.productionDbPassword,
      port: process.env.productionDbPort,
    },
  },
  development: {
    database: {
      name: process.env.developmentDBName,
      host: process.env.developmentDbHost,
      user: process.env.developmentDbUser,
      password: process.env.developmentDbPassword,
      port: process.env.developmentDbPort,
    },
  },
  test: {
    database: {
      name: process.env.testDBName,
      host: process.env.testDbHost,
      user: process.env.testDbUser,
      password: process.env.testDbPassword,
      port: process.env.testDbPort,
    },
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

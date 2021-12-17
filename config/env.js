const env = {
  prod: {
    host: process.env.prodDbHost,
    user: process.env.prodDbUser,
    password: process.env.prodDbPassword,
    port: process.env.prodDbPort,
  },
  dev: {
    host: process.env.devDbHost,
    user: process.env.devDbUser,
    password: process.env.devDbPassword,
    port: process.env.devDbPort,
  },
  test: {
    host: process.env.testDbHost,
    user: process.env.testDbUser,
    password: process.env.testDbPassword,
    port: process.env.testDbPort,
  },
}

function getEnv() {
  switch (process.env.NODE_ENV) {
    case 'prod':
      return env.prod;
    case 'test':
      return env.test;
    case 'dev':
    default:
      return env.dev;
  }
}

module.exports = {
  env,
  getEnv,
};

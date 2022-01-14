const fs = require('fs');

const { env } = require('./env');

fs.unlink('./config/config.json', function (err) {
  if (err) throw err;
  console.log('config file deleted!');
});

const {
  development,
  test,
  production,
} = env;

const configData = {
  development: {
    username: development.database.user,
    password: development.database.password,
    database: development.database.name,
    host: development.database.host,
    dialect: "mysql"
  },
  test: {
    username: test.database.user,
    password: test.database.password,
    database: test.database.name,
    host: test.database.host,
    dialect: "mysql"
  },
  production: {
    username: production.database.user,
    password: production.database.password,
    database: production.database.name,
    host: production.database.host,
    dialect: "mysql"
  }
};

fs.appendFile('./config/config.json', JSON.stringify(configData), function (err) {
  if (err) throw err;
  console.log('config file saved successfully!');
});
const fs = require('fs');

const { env } = require('./env');

function resetDBConfigFolder() {
  return new Promise((resolve, reject) => {
    fs.stat('./config/config.json', function(readError) {
      if(readError === null) {
        fs.unlink('./config/config.json', function (deleteError) {
          if (deleteError) {
            reject(deleteError);
            throw deleteError;
          }
          console.log('config file deleted!');
          resolve(true);
        });
      } else {
        const isFolderExist = fs.existsSync('./config');
        if (isFolderExist) {
          resolve(true);
        } else {
          fs.mkdir('./config', function (createDirError) {
            if (createDirError) {
              reject(createDirError);
              throw createDirError;
            }
            console.log('createDirError success!');
            resolve(true);
          })
        }
      }
    });
  })
}

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

function resetDBConfigFile() {
  fs.appendFile('./config/config.json', JSON.stringify(configData), function (err) {
    if (err) throw err;
    console.log('config file saved successfully!');
  });
}


resetDBConfigFolder().then(resetDBConfigFile);
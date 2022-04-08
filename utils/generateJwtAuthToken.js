const jwt = require('jsonwebtoken');
const { getDatabaseEnv } = require('../env');

function generateJwtAuthToken(options = {}, expiresIn = '1d') {
  const { tokenSecret } = getDatabaseEnv()
  const authToken = jwt.sign({
    createdAt: new Date().getTime(),
    ...options,
  }, 
  tokenSecret,
  {
    expiresIn,
  });

  return authToken;
}

module.exports = generateJwtAuthToken;

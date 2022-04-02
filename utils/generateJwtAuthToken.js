const jwt = require('jsonwebtoken');
const { getEnv } = require('../env');

function generateJwtAuthToken(options = {}, expiresIn = '1d') {
  const { tokenSecret } = getEnv()
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

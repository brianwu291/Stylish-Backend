const jwt = require('jsonwebtoken');

const { getDatabaseEnv } = require('../env');
// const { sequelize } = require('../models');

function validateJwtToken(request, response, next) {
  const { authorization } = request.headers;
  const hasToken = Boolean(
    authorization && authorization.startsWith("Bearer ")
  );

  if (!hasToken) {
    return response.status(401).send({
      errorMessage: "unauthorized",
      errorKey: "setting-error-user",
    });
  }

  const accessToken = authorization.replace("Bearer ", "");

  try {
    const { tokenSecret } = getDatabaseEnv();
    const { name, email } = jwt.verify(accessToken, tokenSecret);
    request.userInfoFromJwt = { name, email };
    return next();
  } catch(error) {
    console.log('error', error)
    return response.status(403).send({
      errorMessage: "forbidden",
      errorKey: "setting-error-user",
    });
  }
}

module.exports = validateJwtToken;

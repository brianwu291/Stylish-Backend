const validator = require("validator");

/**
 * @param {Object} request
 * @param {{
 *   email: string,
 *   password: string,
 * }} request.body
 * @param {{ status: () => ({ send: (param) => param }) }} response
 * @param {Function} next
 * @returns {Send.return | next.return}
 */
function validateUserLogin(request, response, next) {
  const { email, password } = request.body;

  const missingOneField = !email || !password;

  if(missingOneField) {
    return response.status(400).send({
      errorMessage: "email and password are required.",
      errorKey: "setting-error-user-signup"
    });
  }

  if (!validator.isEmail(email)) {
    return response.status(400).send({
      errorMessage: "Invalid email format",
      errorKey: "setting-error-user-signup"
    });
  }

  return next();
}

module.exports = validateUserLogin;

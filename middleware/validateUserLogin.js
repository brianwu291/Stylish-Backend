const validator = require("validator");

const missingFieldError = {
  errorMessage: "email and password are required",
  errorKey: "setting-error-user-signup"
};
const passwordTypeValidateError = {
  errorMessage: "password type invalid",
  errorKey: "setting-error-user-signup"
};
const emailFormatValidateError = {
  errorMessage: "invalid email format",
  errorKey: "setting-error-user-signup"
}

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
    return response.status(400).send(missingFieldError);
  }

  if (typeof password !== "string") {
    return response.status(400).send(passwordTypeValidateError);
  }

  if (!validator.isEmail(email)) {
    return response.status(400).send(emailFormatValidateError);
  }

  return next();
}

module.exports = {
  validateUserLogin,
  missingFieldError,
  passwordTypeValidateError,
  emailFormatValidateError,
};

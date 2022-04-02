const validator = require("validator");

/**
 * @param {Object} request
 * @param {{
 *   name: string,
 *   email: string,
 *   password: string,
 *   birthday: Date,
 *   profileImage: string,
 * }} request.body
 * @param {{ status: () => ({ send: (param) => param }) }} response
 * @param {Function} next
 * @returns {Send.return | next.return}
 */
function validateUserSignup(request, response, next) {
  const {
    name,
    email,
    password,
    birthday,
    profileImage,
  } = request.body;

  const missingOneField = !name || !email || !password;

  if(missingOneField) {
    return response.status(400).send({
      errorMessage: "name, email and password are required.",
      errorKey: "setting-error-user-signup"
    });
  }

  if (!validator.isDate(birthday)) {
    return response.status(400).send({
      errorMessage: "Invalid birthday format",
      errorKey: "setting-error-user-signup"
    });
  }

  if (!validator.isURL(profileImage)) {
    return response.status(400).send({
      errorMessage: "Invalid profileImage format",
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

module.exports = validateUserSignup;

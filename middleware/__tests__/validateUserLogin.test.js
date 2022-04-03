const {
  validateUserLogin,
  missingFieldError,
  passwordTypeValidateError,
  emailFormatValidateError,
} = require("../validateUserLogin");

afterEach(() => {
  jest.clearAllMocks();
});

const mockedEmail = "eee222@gmail.com";
const mockedMissingEmail = "";
const mockedInvalidEmail = "eee222@gccc";

const mockedPassword = "password";
const mockedMissingPassword = "";
const mockedInvalidPassword = 112233;

const mockedRequest = {
  body: {
    email: "",
    password: "",
  },
};

const mockedSend = jest.fn(() => {});

const mockedResponse = {
  status: () => ({
    send: mockedSend
  })
};

const mockedNextReturn = { next: 'next' };
const mockedNext = jest.fn(() => mockedNextReturn);

describe("validate user login:", () => {
  it.each`
     email                  |  password                     |   expectedReturn
    ${mockedEmail}          | ${mockedPassword}             |  ${mockedNextReturn}
    ${mockedMissingEmail}   | ${mockedMissingPassword}      |  ${missingFieldError}
    ${mockedMissingEmail}   | ${mockedPassword}             |  ${missingFieldError}
    ${mockedEmail}          | ${mockedMissingPassword}      |  ${missingFieldError}
    ${mockedInvalidEmail}   | ${mockedPassword}             |  ${emailFormatValidateError}
    ${mockedEmail}          | ${mockedInvalidPassword}      |  ${passwordTypeValidateError}
    `('if email: $email and password: $password, then return $expectedReturn', ({
      email, password, expectedReturn,
    }) => {
    mockedRequest.body = { email, password };
    mockedSend.mockReturnValue(expectedReturn);

    expect(validateUserLogin(mockedRequest, mockedResponse, mockedNext))
    .toEqual(expectedReturn);
  });
});


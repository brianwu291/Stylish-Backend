const { validateUserId, validateError } = require("../validateUserId");

afterEach(() => {
  jest.clearAllMocks();
});

const mockedRequest = {
  params: { id: 12 }
};

const mockedSend = jest.fn(
  () => validateError
);

const mockedResponse = {
  status: () => ({
    send: mockedSend
  })
};

const mockedNextReturn = { next: 'next' };
const mockedNext = jest.fn(() => mockedNextReturn);

const veryLongInt = 111111111111111111111111111111111111111111111;

describe("For invalid id params", () => {
  it.each`
    id              | expectedError
    ${NaN}          | ${validateError}
    ${veryLongInt}  | ${validateError}
    ${"ddd"}        | ${validateError}
    ${{}}           | ${validateError}
    `('if input id: $id (which is invalid), then return error: $expectedError', ({ id, expectedError }) => {
    mockedRequest.params.id = id;
    expect(validateUserId(mockedRequest, mockedResponse, mockedNext))
    .toEqual(expectedError);
  });
});



describe("For valid id params", () => {
  it.each`
    id     | expectedReturn
    ${'1'} | ${mockedNextReturn}
    ${2}   | ${mockedNextReturn}
    `('if input id: $id (which is valid), then return next function return: $expectedReturn', ({ id, expectedReturn }) => {
    mockedRequest.params.id = id;
    expect(validateUserId(mockedRequest, mockedResponse, mockedNext))
    .toEqual(expectedReturn);
  });
});

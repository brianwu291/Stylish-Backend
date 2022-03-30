const isPositiveInteger = require('../isPositiveInteger');

const zero = 0;
const one = 1;

it.each`
  values            | expectedResult
  ${undefined}      | ${false}
  ${null}           | ${false}
  ${NaN}            | ${false}
  ${{}}             | ${false}
  ${[]}             | ${false}
  ${''}             | ${false}
  ${'0'}            | ${false}
  ${'1'}            | ${false}
  ${zero}           | ${false}
  ${zero - one}     | ${false}
  ${one}            | ${true}
    `('if input values: $values, then return $expectedResult', ({ values, expectedResult }) => {
  expect(isPositiveInteger(values)).toEqual(expectedResult);
});
import { snakeCase } from '.';

describe('snakeCase', () => {
  it.each([
    ['abc-def', 'abc_def'],
    ['abcdef', 'abcdef'],
    ['abcDef', 'abc_def'],
    ['AbcDef', 'abc_def'],
    ['abc def', 'abc_def'],
    ['abc_def', 'abc_def'],
    ['__abc-def_ghi--', 'abc_def_ghi'],
    ['__Abc-def_ghi__', 'abc_def_ghi'],
  ])('should convert %s to %s', (value, expectedString) => {
    expect(snakeCase(value)).toEqual(expectedString);
  });
});

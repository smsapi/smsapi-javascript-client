import { camelCase } from '.';

describe('camelCase', () => {
  it.each([
    ['abc-def', 'abcDef'],
    ['abcdef', 'abcdef'],
    ['abcDef', 'abcDef'],
    ['AbcDef', 'abcDef'],
    ['abc def', 'abcDef'],
    ['abc_def', 'abcDef'],
    ['__abc-def_ghi--', 'abcDefGhi'],
  ])('should convert %s to %s', (value, expectedString) => {
    expect(camelCase(value)).toEqual(expectedString);
  });
});

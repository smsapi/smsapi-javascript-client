import { isObject } from '.';

describe('isObject', () => {
  it.each([{}, new Date(), [1], new Object()])(
    'should true for %o',
    (value) => {
      expect(isObject(value)).toBe(true);
    },
  );

  it.each([null, 'abc', 1])('should false for %o', (value) => {
    expect(isObject(value)).toBe(false);
  });
});

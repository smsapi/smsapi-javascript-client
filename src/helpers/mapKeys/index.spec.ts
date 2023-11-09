import { mapKeys } from '.';

describe('mapKeys', () => {
  it('should transform keys', () => {
    const obj = {
      a: 1,
      b: 2,
    };

    expect(mapKeys(obj, (key) => key.toUpperCase())).toEqual({
      A: 1,
      B: 2,
    });
  });
});

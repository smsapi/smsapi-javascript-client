import { mapValues } from '.';

describe('mapValues', () => {
  it('should transform values', () => {
    const obj = {
      a: 'a',
      b: 'b',
    };

    expect(mapValues(obj, (value) => value.toUpperCase())).toEqual({
      a: 'A',
      b: 'B',
    });
  });
});

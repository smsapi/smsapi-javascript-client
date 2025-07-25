import { isObject } from '../isObject';

export const mapKeys = (
  value: Record<string, unknown>,
  callback: (key: string) => string,
): Record<string, unknown> => {
  if (value === undefined || !isObject(value)) {
    return value;
  }

  const result = {};

  Object.entries(value).forEach(([key, value]) => {
    result[callback(key)] = value;
  });

  return result;
};

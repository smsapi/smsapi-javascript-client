/* eslint-disable @typescript-eslint/no-explicit-any */
import { isObject } from '../isObject';

export const mapValues = (
  value: Record<string, unknown>,
  callback: (value: any, key: string) => any,
): Record<string, any> => {
  if (value === undefined || !isObject(value)) {
    return value;
  }

  const result = {};

  Object.entries(value).forEach(([key, value]) => {
    result[key] = callback(value, key);
  });

  return result;
};

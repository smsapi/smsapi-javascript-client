import { AxiosResponse } from 'axios';
import camelCase from 'lodash/camelCase';
import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';
import isDate from 'lodash/isDate';
import isObject from 'lodash/isObject';
import mapKeys from 'lodash/mapKeys';

const formatKeys = (
  object: Record<string, unknown>,
): Record<string, unknown> => {
  return mapKeys(object, (_, key) => {
    return camelCase(key);
  });
};

const formatResponse = (object: Record<string, unknown>) => {
  const newResponse = formatKeys(object);

  forEach(newResponse, (value, key) => {
    if (isDate(value)) {
      return;
    }

    if (isArray(value)) {
      newResponse[key] = value.map((arrayValue) =>
        isObject(arrayValue) && !isDate(arrayValue)
          ? formatKeys(arrayValue as Record<string, unknown>)
          : arrayValue,
      );

      return;
    }

    if (isObject(value)) {
      newResponse[key] = formatKeys(value as Record<string, unknown>);
    }
  });

  return newResponse;
};

const isApiCollection = (data: Record<string, unknown>): boolean => {
  return !!data.collection && !!data.size;
};

const isSmsResponse = (data: Record<string, unknown>): boolean => {
  return !!data.list && !!data.count;
};

export const extractDataFromResponse = (response: AxiosResponse) => {
  const { data } = response;

  if (!data) {
    return data;
  }

  if (isArray(data)) {
    return data.map(formatResponse);
  }

  if (isApiCollection(data)) {
    return {
      ...data,
      collection: data.collection.map(formatResponse),
    };
  }

  if (isSmsResponse(data)) {
    return {
      ...data,
      list: data.list.map(formatResponse),
    };
  }

  return formatResponse(data);
};

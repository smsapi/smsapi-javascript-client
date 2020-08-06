import { AxiosResponse } from 'axios';
import camelCase from 'lodash/camelCase';
import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import mapKeys from 'lodash/mapKeys';

const formatKeys = (
  object: Record<string, unknown>
): Record<string, unknown> => {
  return mapKeys(object, (_, key) => {
    return camelCase(key);
  });
};

const formatResponse = (object: Record<string, unknown>) => {
  const newResponse = formatKeys(object);

  forEach(newResponse, (value, key) => {
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

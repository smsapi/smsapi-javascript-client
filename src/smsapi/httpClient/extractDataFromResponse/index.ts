import { AxiosResponse } from 'axios';

import { mapKeys } from '../../../helpers/mapKeys';
import { isObject } from '../../../helpers/isObject';
import { camelCase } from '../../../helpers/camelCase';

const formatKeys = (
  object: Record<string, unknown>,
): Record<string, unknown> => {
  return mapKeys(object, camelCase);
};

const formatResponse = (object: Record<string, unknown>) => {
  const newResponse = formatKeys(object);

  Object.entries(newResponse).forEach(([key, value]) => {
    if (value instanceof Date) {
      return;
    }

    if (Array.isArray(value)) {
      newResponse[key] = value.map((arrayValue) =>
        isObject(arrayValue) && !(arrayValue instanceof Date)
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

  if (Array.isArray(data)) {
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

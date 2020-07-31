import { AxiosResponse } from 'axios';
import camelCase from 'lodash/camelCase';
import isArray from 'lodash/isArray';
import mapKeys from 'lodash/mapKeys';

const formatResponse = (object: any) => {
  return mapKeys(object, (_, key) => {
    return camelCase(key);
  });
};

export const extractDataFromResponse = (response: AxiosResponse) => {
  const { data } = response;

  if (!data) {
    return data;
  }

  if (isArray(data)) {
    return data.map(formatResponse);
  }

  if (data.collection && data.size) {
    return {
      ...data,
      collection: data.collection.map(formatResponse),
    };
  }

  return formatResponse(data);
};

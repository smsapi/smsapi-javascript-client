import { stringify } from 'querystring';

import { AxiosRequestConfig } from 'axios';
import isArray from 'lodash/isArray';
import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';
import snakeCase from 'lodash/snakeCase';

import { formatDate } from '../../helpers/formatDate';

const formatKeys = (data: Record<string, string | boolean | number>) => {
  return mapKeys(data, (_, key) => {
    return snakeCase(key);
  });
};

export const prepareParamsForRequest = (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
  const { data, method, params } = config;

  if (['get', 'delete'].includes((method as string).toLowerCase())) {
    let formattedParams = mapValues(params, (value, key) => {
      if (key === 'birthdayDate') {
        if (isArray(value)) {
          return value.map(formatDate);
        }

        return formatDate(value);
      }

      return value;
    });

    formattedParams = formatKeys(formattedParams);

    return {
      ...config,
      params: formattedParams,
      paramsSerializer: (params) => stringify(params),
    };
  }

  if (data) {
    return {
      ...config,
      data: stringify(formatKeys(data)),
    };
  }

  return config;
};

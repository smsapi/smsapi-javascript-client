import { stringify } from 'querystring';

import { AxiosRequestConfig } from 'axios';
import isArray from 'lodash/isArray';
import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';
import snakeCase from 'lodash/snakeCase';

import { formatDate } from '../../helpers/formatDate';

export const prepareParamsForRequest = (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
  const { data, method, params } = config;

  if (method?.toLowerCase() === 'get') {
    let formattedParams = mapValues(params, (value, key) => {
      if (key === 'birthdayDate') {
        if (isArray(value)) {
          return value.map(formatDate);
        }

        return formatDate(value);
      }

      return value;
    });

    formattedParams = mapKeys(formattedParams, (_, key) => {
      return snakeCase(key);
    });

    return {
      ...config,
      params: formattedParams,
      paramsSerializer: (params) => stringify(params),
    };
  }

  if (data) {
    return {
      ...config,
      data: stringify(data),
    };
  }

  return config;
};

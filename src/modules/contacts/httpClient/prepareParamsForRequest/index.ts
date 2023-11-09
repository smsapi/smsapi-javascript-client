import { stringify } from 'querystring';

import { InternalAxiosRequestConfig } from 'axios';

import { formatDate } from '../../helpers/formatDate';
import { mapKeys } from '../../../../helpers/mapKeys';
import { mapValues } from '../../../../helpers/mapValues';
import { snakeCase } from '../../../../helpers/snakeCase';

const formatKeys = (data: Record<string, string | boolean | number>) => {
  return mapKeys(data, snakeCase);
};

export const prepareParamsForRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const { data, method, params } = config;

  if (['get', 'delete'].includes((method as string).toLowerCase())) {
    let formattedParams = mapValues(params, (value, key) => {
      if (key === 'birthdayDate') {
        if (Array.isArray(value)) {
          return value.map(formatDate).join(',');
        }

        return value instanceof Date ? formatDate(value) : value;
      }

      if (Array.isArray(value)) {
        return value.join(',');
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

import { formatDate } from '../../helpers/formatDate';
import { mapKeys } from '../../../../helpers/mapKeys';
import { mapValues } from '../../../../helpers/mapValues';
import { snakeCase } from '../../../../helpers/snakeCase';
import { RequestInterceptor } from '../../../../smsapi/httpClient';

const formatKeys = (data: Record<string, unknown>) => {
  return mapKeys(data, snakeCase);
};

export const prepareParamsForRequest: RequestInterceptor = (config) => {
  const { body, method, params } = config;

  if (params && ['get', 'delete'].includes((method as string).toLowerCase())) {
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
    };
  }

  if (body && typeof body === 'object' && !Buffer.isBuffer(body)) {
    return {
      ...config,
      body: formatKeys(body) as Record<string, string | number | boolean>,
    };
  }

  return config;
};

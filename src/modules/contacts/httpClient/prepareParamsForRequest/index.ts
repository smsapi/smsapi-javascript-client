import { formatDate } from '../../helpers/formatDate';
import { mapKeys } from '../../../../helpers/mapKeys';
import { mapValues } from '../../../../helpers/mapValues';
import { snakeCase } from '../../../../helpers/snakeCase';
import { RequestOptions } from '../../../../smsapi/httpClient';

const formatKeys = (data: Record<string, string | boolean | number>) => {
  return mapKeys(data, snakeCase);
};

export const prepareParamsForRequest = (
  method: string,
  options: RequestOptions,
): RequestOptions => {
  const { data, params } = options;

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
      params: formattedParams,
    };
  }

  if (data) {
    return {
      data: formatKeys(data),
    };
  }

  return options;
};

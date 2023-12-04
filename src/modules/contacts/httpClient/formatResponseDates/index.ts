/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiCollection } from '../../../../types/ApiCollection';

interface ApiGroup {
  date_created: string;
  date_updated: string;
}

const isApiCollection = (
  data: ApiGroup | ApiCollection<ApiGroup>,
): data is ApiCollection<ApiGroup> => {
  return (
    !!(data as ApiCollection<ApiGroup>).size &&
    !!(data as ApiCollection<ApiGroup>).collection
  );
};

const formatDates = (group: ApiGroup): Record<string, Date | string> => {
  if (!group.date_created && !group.date_updated) {
    return {
      ...group,
    };
  }

  return {
    ...group,
    date_created: new Date(group.date_created),
    date_updated: new Date(group.date_updated),
  };
};

export const formatResponseDates = (data: any): any => {
  if (!data) {
    return data;
  }

  if (isApiCollection(data)) {
    return {
      collection: data.collection.map((group) => formatDates(group)),
      size: data.size,
    };
  }

  return formatDates(data);
};

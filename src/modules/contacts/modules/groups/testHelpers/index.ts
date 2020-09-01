import { SMSAPI } from '../../../../../smsapi';
import { Group } from '../types/Group';

export const createTestGroup = (
  groupName: string,
  smsapi: SMSAPI
): Promise<Group> => {
  return smsapi.contacts.groups.create(groupName);
};

export const removeTestGroup = (
  groupId: string,
  smsapi: SMSAPI
): Promise<void> => {
  return smsapi.contacts.groups.remove(groupId);
};

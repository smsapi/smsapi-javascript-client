import { SMSAPI } from '../../../../../smsapi';
import { Group } from '../types/Group';

export const createTestGroup = async (
  groupName: string,
  smsapi: SMSAPI
): Promise<Group> => {
  return await smsapi.contacts.groups.create(groupName);
};

export const removeTestGroup = async (
  groupId: string,
  smsapi: SMSAPI
): Promise<void> => {
  await smsapi.contacts.groups.remove(groupId, true);
};

import { SMSAPI } from '../../../../../smsapi';
import { Group } from '../types/Group';
export declare const createTestGroup: (groupName: string, smsapi: SMSAPI) => Promise<Group>;
export declare const removeTestGroup: (groupId: string, smsapi: SMSAPI) => Promise<void>;

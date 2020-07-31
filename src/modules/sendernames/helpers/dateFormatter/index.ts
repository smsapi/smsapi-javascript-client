import { Sendername } from '../../types/Sendername';
import { ApiSendername } from '../../';

export const dateFormatter = (sendername: ApiSendername): Sendername => ({
  ...sendername,
  createdAt: new Date(sendername.createdAt),
});

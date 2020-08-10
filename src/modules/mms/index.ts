import { BaseMessageModule } from '../baseMessageModule';
import { MessageResponse } from '../../types/MessageResponse';

import { MmsDetails } from './types/MmsDetails';

export class Mms extends BaseMessageModule {
  endpoint = '/mms.do';

  async sendMms(
    numbers: string | string[],
    subject: string,
    smil: string,
    details?: MmsDetails
  ): Promise<MessageResponse> {
    return await this.send(
      {
        smil,
        subject,
      },
      numbers,
      undefined,
      details
    );
  }

  async sendMmsToGroup(
    groups: string | string[],
    subject: string,
    smil: string,
    details?: MmsDetails
  ): Promise<MessageResponse> {
    return await this.send(
      {
        smil,
        subject,
      },
      undefined,
      groups,
      details
    );
  }
}

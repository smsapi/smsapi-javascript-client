import fs from 'fs';

import FormData from 'form-data';

import { BaseModule } from '../baseModule';
import { SmsDetails } from '../sms/types/SmsDetails';
import {
  ApiMessageResponse,
  MessageResponse,
} from '../../types/MessageResponse';
import {
  MessageError,
  MessageErrorResponse,
  isMessageErrorResponseData,
} from '../../errors/MessageError';
import { mapKeys } from '../../helpers/mapKeys';
import { snakeCase } from '../../helpers/snakeCase';

import {
  MessageContent,
  SmsContent,
  MmsContent,
  VmsTextContent,
  VmsLocalFileContent,
  VmsRemoteFileContent,
} from './types/MessageContent';

interface SmsApiDetails {
  [key: string]: unknown;
}

interface NumberRecipient {
  to: string | string[];
}

interface GroupRecipient {
  group: string | string[];
}

type Recipient = NumberRecipient | GroupRecipient;

export class BaseMessageModule extends BaseModule {
  protected endpoint: string;

  protected async send(
    content: MessageContent,
    recipient: Recipient,
    details?: SmsDetails,
  ): Promise<MessageResponse> {
    const body: Record<string, unknown> = {
      details: true,
      encoding: 'utf-8',
      format: 'json',
      ...this.formatSmsDetails(details || {}),
    };

    if (this.isNumberRecipient(recipient)) {
      const { to } = recipient;

      body.to = Array.isArray(to) ? to.join(',') : to;
    }

    if (this.isGroupRecipient(recipient)) {
      const { group } = recipient;

      body.group = Array.isArray(group) ? group.join(',') : group;
    }

    if (this.isSms(content)) {
      body.message = content.message.trim();
    }

    if (this.isMms(content)) {
      body.subject = content.subject.trim();
      body.smil = content.smil;
    }

    if (this.isVmsText(content)) {
      body.tts = content.tts.trim();
      body.tts_lector = content.ttsLector || 'ewa';
    }

    if (this.isVmsRemotePath(content)) {
      body.file = content.remotePath;
    }

    if (this.isVmsLocalFile(content)) {
      const formData = this.getFormDataForVmsLocalFile(body, content);

      const data = await this.httpClient.post<
        ApiMessageResponse | MessageErrorResponse
      >(this.endpoint, formData.getBuffer(), {
        headers: formData.getHeaders(),
      });

      if (isMessageErrorResponseData(data)) {
        throw new MessageError(data);
      }

      return this.formatResponse(data);
    }

    const data = await this.httpClient.post<
      ApiMessageResponse | MessageErrorResponse
    >(this.endpoint, body);

    if (isMessageErrorResponseData(data)) {
      throw new MessageError(data);
    }

    return this.formatResponse(data);
  }

  private isNumberRecipient(
    recipient: Recipient,
  ): recipient is NumberRecipient {
    return (recipient as NumberRecipient).to !== undefined;
  }

  private isGroupRecipient(recipient: Recipient): recipient is GroupRecipient {
    return (recipient as GroupRecipient).group !== undefined;
  }

  private isSms(content: MessageContent): content is SmsContent {
    return (content as SmsContent).message !== undefined;
  }

  private isMms(content: MessageContent): content is MmsContent {
    return (
      (content as MmsContent).smil !== undefined &&
      (content as MmsContent).subject !== undefined
    );
  }

  private isVmsText(content: MessageContent): content is VmsTextContent {
    return (content as VmsTextContent).tts !== undefined;
  }

  private isVmsLocalFile(
    content: MessageContent,
  ): content is VmsLocalFileContent {
    return (content as VmsLocalFileContent).localPath !== undefined;
  }

  private isVmsRemotePath(
    content: MessageContent,
  ): content is VmsRemoteFileContent {
    return (content as VmsRemoteFileContent).remotePath !== undefined;
  }

  private getFormDataForVmsLocalFile(
    body: Record<string, unknown>,
    content: VmsLocalFileContent,
  ): FormData {
    const formData = new FormData();

    if (body.to) {
      formData.append('to', body.to);
    }

    if (body.group) {
      formData.append('group', body.group);
    }

    for (const [key, value] of Object.entries(body)) {
      if (typeof value === 'boolean') {
        formData.append(key, value ? 1 : 0);
        continue;
      }

      formData.append(key, value as string);
    }

    formData.append('file', fs.readFileSync(content.localPath), {
      contentType: 'audio/wav',
      filename: 'vms.wav',
    });

    return formData;
  }

  private formatSmsDetails(details: SmsDetails): SmsApiDetails {
    const formattedDetails = details as Record<string, unknown>;

    if (details.date) {
      formattedDetails.dateValidate = true;
      formattedDetails.date = details.date.toISOString();
    }

    if (details.expirationDate) {
      formattedDetails.expirationDate = details.expirationDate.toISOString();
    }

    return mapKeys(formattedDetails, (key) => {
      if (/param[1-4]/.test(key)) {
        return key;
      }

      if (key === 'noUnicode') {
        return key.toLowerCase();
      }

      return snakeCase(key);
    });
  }

  protected formatResponse(response: ApiMessageResponse): MessageResponse {
    return {
      ...response,
      list: response.list.map((sms) => ({
        ...sms,
        dateSent: new Date(sms.dateSent * 1000),
        points:
          typeof sms.points === 'string' ? parseFloat(sms.points) : sms.points,
      })),
    };
  }
}

import { BaseMessageModule } from '../baseMessageModule';
import { MessageResponse } from '../../types/MessageResponse';

import { VmsTtsLector } from './types/VmsTtsLector';
import { VmsDetails } from './types/VmsDetails';

export class Vms extends BaseMessageModule {
  endpoint = '/vms.do';

  async sendVms(
    numbers: string | string[],
    tts: string,
    ttsLector?: VmsTtsLector,
    details?: VmsDetails,
  ): Promise<MessageResponse> {
    return await this.send(
      {
        tts,
        ttsLector,
      },
      {
        to: numbers,
      },
      details,
    );
  }

  async sendVmsWithLocalFile(
    numbers: string | string[],
    pathToLocaleFile: string,
    details?: VmsDetails,
  ): Promise<MessageResponse> {
    return await this.send(
      {
        localPath: pathToLocaleFile,
      },
      {
        to: numbers,
      },
      details,
    );
  }

  async sendVmsWithRemoteFile(
    numbers: string | string[],
    pathToRemoteFile: string,
    details?: VmsDetails,
  ): Promise<MessageResponse> {
    return await this.send(
      {
        remotePath: pathToRemoteFile,
      },
      {
        to: numbers,
      },
      details,
    );
  }

  async sendVmsToGroup(
    groups: string | string[],
    tts: string,
    ttsLector?: VmsTtsLector,
    details?: VmsDetails,
  ): Promise<MessageResponse> {
    return await this.send(
      {
        tts,
        ttsLector,
      },
      {
        group: groups,
      },
      details,
    );
  }

  async sendVmsWithLocalFileToGroup(
    groups: string | string[],
    pathToLocaleFile: string,
    details?: VmsDetails,
  ): Promise<MessageResponse> {
    return await this.send(
      {
        localPath: pathToLocaleFile,
      },
      {
        group: groups,
      },
      details,
    );
  }

  async sendVmsWithRemoteFileToGroup(
    groups: string | string[],
    pathToRemoteFile: string,
    details?: VmsDetails,
  ): Promise<MessageResponse> {
    return await this.send(
      {
        remotePath: pathToRemoteFile,
      },
      {
        group: groups,
      },
      details,
    );
  }
}

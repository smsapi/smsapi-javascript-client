/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import phin from 'phin';

// @ts-ignore TS6059
import { version } from '../../../package.json';
import { API_URL } from '../../constants';

import { extractDataFromResponse } from './extractDataFromResponse';

export interface RequestOptions {
  data?: any;
  headers?: any;
  params?: any;
}

export class HttpClient {
  private accessToken: string;

  private requestInterceptors: ((
    method: string,
    options: RequestOptions,
  ) => RequestOptions)[] = [];
  private responseInterceptors: ((response: any) => any)[] = [];

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  public addRequestInterceptors(
    interceptor: (method: string, options: RequestOptions) => RequestOptions,
  ): void {
    this.requestInterceptors.push(interceptor);
  }

  public addResponseInterceptors(
    interceptor: (response: unknown) => unknown,
  ): void {
    this.responseInterceptors.push(interceptor);
  }

  public async get<T>(uri: string, options?: RequestOptions): Promise<T> {
    return this.request('GET', uri, options);
  }

  public async post<T>(uri: string, options?: RequestOptions): Promise<T> {
    return this.request('POST', uri, options);
  }

  public async put<T>(uri: string, options?: RequestOptions): Promise<T> {
    return this.request('PUT', uri, options);
  }

  public async delete<T>(uri: string, options?: RequestOptions): Promise<T> {
    return this.request('DELETE', uri, options);
  }

  private async request<T>(
    method: string,
    uri: string,
    options?: RequestOptions,
  ): Promise<T> {
    const url = new URL(`${API_URL}${uri}`);

    const transformedOptions = this.requestInterceptors.reduce<RequestOptions>(
      (options, interceptor) => {
        return interceptor(method, options);
      },
      options ?? {},
    );

    if (transformedOptions?.params) {
      url.search = new URLSearchParams(transformedOptions.params).toString();
    }

    const response = await phin<T>({
      data: transformedOptions?.data,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
        'User-Agent': this.getUserAgent(),
        ...(transformedOptions?.headers || {}),
      },
      method: method,
      parse: 'json',
      url: url.toString(),
    });

    const data = this.responseInterceptors.reduce((data, interceptor) => {
      return interceptor(data);
    }, response.body);

    return extractDataFromResponse(data);
  }

  private getUserAgent(): string {
    return `smsapi/js-client:${version}`;
  }
}

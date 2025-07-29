import { extractDataFromResponse } from './extractDataFromResponse';

export type QueryParams = Record<string, unknown>;

export interface RequestConfig {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: Record<string, unknown> | string | FormData;
  params?: QueryParams;
}

interface RequestOptions {
  headers?: Record<string, string>;
  params?: QueryParams;
}

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

export type RequestInterceptor = (config: RequestConfig) => RequestConfig;
export type ResponseInterceptor = <T = unknown>(
  response: ApiResponse<T>,
) => ApiResponse<T>;

export class HttpClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  constructor(baseUrl: string, defaultHeaders: Record<string, string> = {}) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    };
  }

  addRequestInterceptor = (interceptor: RequestInterceptor): void => {
    this.requestInterceptors.push(interceptor);
  };

  addResponseInterceptor = (interceptor: ResponseInterceptor): void => {
    this.responseInterceptors.push(interceptor);
  };

  private buildUrl = (endpoint: string, params?: unknown): string => {
    const url = new URL(`${this.baseUrl}/${endpoint.replace(/^\//, '')}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    return url.toString();
  };

  private runRequestInterceptors(config: RequestConfig): RequestConfig {
    let currentConfig = config;

    for (const interceptor of this.requestInterceptors) {
      currentConfig = interceptor(currentConfig);
    }

    return currentConfig;
  }

  private runResponseInterceptors<T>(response: ApiResponse<T>): ApiResponse<T> {
    let currentResponse = response;

    for (const interceptor of this.responseInterceptors) {
      currentResponse = interceptor(currentResponse) as ApiResponse<T>;
    }

    return currentResponse;
  }

  private async makeRequest<T>(
    method: string,
    endpoint: string,
    body: RequestConfig['body'],
    options: RequestOptions = {},
  ): Promise<T> {
    const { headers = {}, params } = options;

    let requestConfig: RequestConfig = {
      body,
      headers: { ...this.defaultHeaders, ...headers },
      method,
      params,
      url: endpoint,
    };

    requestConfig = this.runRequestInterceptors(requestConfig);

    const fetchConfig: RequestInit = {
      headers: requestConfig.headers,
      method: requestConfig.method,
    };

    if (body && method !== 'GET' && method !== 'HEAD') {
      if (requestConfig.body instanceof FormData) {
        delete (fetchConfig.headers as Record<string, string>)['Content-Type'];
        fetchConfig.body = requestConfig.body;
      } else if (requestConfig.body instanceof Buffer) {
        fetchConfig.body = requestConfig.body;
      } else {
        fetchConfig.body = JSON.stringify(requestConfig.body);
      }
    }

    const response = await fetch(
      this.buildUrl(requestConfig.url, requestConfig.params),
      fetchConfig,
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorData}`,
      );
    }

    let apiResponse: ApiResponse<T>;

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const jsonData = await response.json();
      apiResponse = {
        data: jsonData,
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
      };
    } else {
      const textData = await response.text();
      apiResponse = {
        data: textData as T,
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
      };
    }

    apiResponse = this.runResponseInterceptors(apiResponse);

    return extractDataFromResponse(apiResponse);
  }

  get = <T>(endpoint: string, options?: RequestOptions): Promise<T> =>
    this.makeRequest<T>('GET', endpoint, undefined, options);

  post = <T>(
    endpoint: string,
    body?: RequestConfig['body'],
    options?: RequestOptions,
  ): Promise<T> => this.makeRequest<T>('POST', endpoint, body, options);

  put = <T>(
    endpoint: string,
    body?: RequestConfig['body'],
    options?: RequestOptions,
  ): Promise<T> => this.makeRequest<T>('PUT', endpoint, body, options);

  patch = <T>(
    endpoint: string,
    body: RequestConfig['body'],
    options?: RequestOptions,
  ): Promise<T> => this.makeRequest<T>('PATCH', endpoint, body, options);

  delete = <T>(endpoint: string, options?: RequestOptions): Promise<T> =>
    this.makeRequest<T>('DELETE', endpoint, undefined, options);
}

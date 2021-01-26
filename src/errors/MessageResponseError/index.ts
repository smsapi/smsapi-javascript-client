export function isMessageErrorResponseData(
  response: any
): response is MessageErrorResponse {
  return response.error !== undefined && response.message !== undefined;
}

export interface MessageErrorResponse {
  error: number;
  message: string;
}

class MessageError extends Error {
  public data: MessageErrorResponse;

  constructor(data: MessageErrorResponse) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = 'MessageError';
    this.data = data;
  }
}

export { MessageError };

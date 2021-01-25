export function isErrorResponse(response: any): response is ErrorResponse {
  return response.error !== undefined && response.message !== undefined;
}

export interface ErrorResponse {
  error: number;
  message: string;
}

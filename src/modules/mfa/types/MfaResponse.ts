export interface MfaResponse {
  id: string;
  code: string;
  phoneNumber: string;
  from: string | null;
}

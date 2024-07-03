export interface AuthLoginResponse {
  id: number;
  name: string;
  lastname: string;
  email: string;
  mobile?: string;
  token: string;
  confirmationLink?: string;
  expireDate: number;
  role: string;
}

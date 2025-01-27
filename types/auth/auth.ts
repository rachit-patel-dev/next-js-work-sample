export interface LoginRequestType {
  email: string;
  password: string;
}

export interface ForgotPasswordType {
  email: string;
}

export interface ChangePasswordType {
  email: string;
  code: string;
  password: string;
}

export interface AuthGuardType {
  children: React.ReactNode;
}

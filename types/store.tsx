export interface Session {
  token: string;
  expiresAt: string;
}

export interface WeakPassword {
  message: any;
}

export interface AsyncThunkConfig {
  rejectValue: any;
}

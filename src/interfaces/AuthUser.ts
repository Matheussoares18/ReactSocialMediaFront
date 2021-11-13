export interface AuthUser {
  name: string;
  email: string;
  phone?: string;
  birth_date: string;
  gender: string;
  id: string;
  image: string;
  token: string;
  refreshToken: string;
}

export const INSERT_USER = 'INSERT_USER';
export const LOGOUT = 'LOGOUT';

export interface InsertUser {
  type: typeof INSERT_USER;
  user: AuthUser;
}
export interface Logout {
  type: typeof LOGOUT;
}
export interface AuthUserState {
  authUser?: AuthUser;
}

export type AuthUserActionTypes = InsertUser | Logout;

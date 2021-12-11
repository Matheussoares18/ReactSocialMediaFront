export enum Themes {
  DARK = 'dark',
  LIGHT = 'light',
}
export interface AuthUser {
  name?: string;
  email?: string;
  phone?: string;
  // eslint-disable-next-line camelcase
  birth_date?: string;
  gender?: string;
  id?: string;
  image?: string;
  theme?: Themes;
  token?: string;
  refreshToken?: string;
}

export const INSERT_USER = 'INSERT_USER';
export const CHANGE_THEME = 'CHANGE_THEME';
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
export interface ChangeTheme {
  type: typeof CHANGE_THEME;
  theme: Themes;
}

export type AuthUserActionTypes = InsertUser | Logout | ChangeTheme;

import {
  AuthUser,
  ChangeTheme,
  InsertUser,
  Logout,
  Themes,
} from '../../interfaces/AuthUser';

export function insertUser(user: AuthUser): InsertUser {
  return {
    type: 'INSERT_USER',
    user,
  };
}
export function logout(): Logout {
  return {
    type: 'LOGOUT',
  };
}
export function changeTheme(theme: Themes): ChangeTheme {
  return {
    type: 'CHANGE_THEME',
    theme,
  };
}

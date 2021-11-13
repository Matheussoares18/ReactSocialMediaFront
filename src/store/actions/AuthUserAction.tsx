import { AuthUser, InsertUser, Logout } from '../../interfaces/AuthUser';

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

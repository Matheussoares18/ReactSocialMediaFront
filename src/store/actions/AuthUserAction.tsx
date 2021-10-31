import { AuthUser, InsertUser } from '../../interfaces/AuthUser';

export function insertUser(user: AuthUser): InsertUser {
  return {
    type: 'INSERT_USER',
    user,
  };
}

import api from '../api';
import { AuthApiRoutes } from '../ApiRoutes';
import { AutheticateRequest } from './types';

export const authenticate: AutheticateRequest = async (credentials: {
  email: string;
  password: string;
}) => {
  return api.post(AuthApiRoutes.AUTHENTICATE, {
    ...credentials,
  });
};

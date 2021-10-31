import api from '../api';
import { ApiRoutes } from '../ApiRoutes';
import { AutheticateRequest } from './types';

export const authenticate: AutheticateRequest = async (credentials: {
  email: string;
  password: string;
}) => {
  return api.post(ApiRoutes.AUTHENTICATE, {
    ...credentials,
  });
};

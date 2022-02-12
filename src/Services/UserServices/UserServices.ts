import { UserRegisterValues } from '../../interfaces/UserRegister';
import api from '../api';
import { ApiRoutes } from '../ApiRoutes';
import { CreateUserRequest, UpdateUserImageRequest } from './types';

export const createUser: CreateUserRequest = async (
  user: UserRegisterValues
) => {
  return api.post('/users', {
    ...user,
    contact_name: 'Principal',
  });
};

export const updateUserImage: UpdateUserImageRequest = async (
  image: string
) => {
  return api.patch('/users', { image });
};

import { AxiosResponse } from 'axios';
import { UserRegisterValues } from '../../interfaces/UserRegister';

interface User {
  status: string;
  createdUser: {
    name: string;
    email: string;
    document: string;
    birth_date: string;
    gender: string;
    image: string;
    id: string;
  };
}

export type CreateUserRequest = (
  user: UserRegisterValues
) => Promise<AxiosResponse<User>>;

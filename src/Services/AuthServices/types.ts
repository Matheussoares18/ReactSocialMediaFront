import { AxiosResponse } from 'axios';

interface User {
  name: string;
  email: string;
  document: string;
  // eslint-disable-next-line camelcase
  birth_date: string;
  gender: string;
  image: string;
  phone?: string;
  id: string;
  token: string;
  refreshToken: string;
}

export type AutheticateRequest = (credentials: {
  email: string;
  password: string;
}) => Promise<AxiosResponse<User>>;

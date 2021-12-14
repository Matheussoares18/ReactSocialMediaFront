export interface UserRegisterValues {
  name: string;
  email: string;
  phone: string;
  // eslint-disable-next-line camelcase
  birth_date: string;
  gender: string;
  // eslint-disable-next-line camelcase
  password: string;
}

export const UPDATE_VALUES = 'UPDATE_VALUES';

export interface UpdateUserRegisterValues {
  type: typeof UPDATE_VALUES;
  values: UserRegisterValues;
}
export interface UserRegisterState {
  userRegisterValues: UserRegisterValues;
}

export type UserRegisterActionTypes = UpdateUserRegisterValues;

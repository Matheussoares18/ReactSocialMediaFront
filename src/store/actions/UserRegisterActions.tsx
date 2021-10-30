import {
  UpdateUserRegisterValues,
  UserRegisterValues,
} from '../../interfaces/UserRegister';

export function updateUserValues(
  values: UserRegisterValues
): UpdateUserRegisterValues {
  return {
    type: 'UPDATE_VALUES',
    values,
  };
}

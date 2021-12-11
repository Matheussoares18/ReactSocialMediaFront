import {
  UserRegisterActionTypes,
  UserRegisterState,
} from '../../interfaces/UserRegister';

const INITIAL_STATE: UserRegisterState = {
  userRegisterValues: {
    name: '',
    email: '',
    birthDate: '',
    gender: '',
    phone: '',
    password: '',
  },
};

export default function userRegisterValuesReducer(
  // eslint-disable-next-line default-param-last
  state = INITIAL_STATE,
  action: UserRegisterActionTypes
): UserRegisterState {
  switch (action.type) {
    case 'UPDATE_VALUES':
      return {
        ...state,
        userRegisterValues: action.values,
      };

    default:
      return state;
  }
}

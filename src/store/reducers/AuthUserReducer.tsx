import {
  AuthUser,
  AuthUserActionTypes,
  AuthUserState,
} from '../../interfaces/AuthUser';

const INITIAL_STATE: AuthUserState = {
  authUser: undefined,
};

export default function authUserReducer(
  state = INITIAL_STATE,
  action: AuthUserActionTypes
): AuthUserState {
  switch (action.type) {
    case 'INSERT_USER':
      return {
        ...state,
        authUser: { ...action.user },
      };
    case 'LOGOUT':
      return {
        ...state,
        authUser: undefined,
      };
    case 'CHANGE_THEME':
      return {
        ...state,
        authUser: {
          ...state?.authUser,
          theme: action.theme,
        },
      };

    default:
      return state;
  }
}

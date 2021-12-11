import { AuthUserActionTypes, AuthUserState } from '../../interfaces/AuthUser';

const INITIAL_STATE: AuthUserState = {
  authUser: undefined,
};

export default function authUserReducer(
  action: AuthUserActionTypes,
  state = INITIAL_STATE
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

import { AuthUserActionTypes, AuthUserState } from '../../interfaces/AuthUser';

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

    default:
      return state;
  }
}

import { combineReducers } from 'redux';
import userRegisterValuesReducer from './UserRegisterReducer';

const rootReducer = combineReducers({
  userRegisterValues: userRegisterValuesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

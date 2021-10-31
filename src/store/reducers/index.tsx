import { combineReducers } from 'redux';
import authUserReducer from './AuthUserReducer';
import postsReducer from './PostsReducer';
import userRegisterValuesReducer from './UserRegisterReducer';

const rootReducer = combineReducers({
  userRegisterValues: userRegisterValuesReducer,
  authUser: authUserReducer,
  posts: postsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

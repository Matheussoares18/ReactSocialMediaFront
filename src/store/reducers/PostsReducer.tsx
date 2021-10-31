import { PostsActionTypes, PostsState } from '../../interfaces/Posts';

const INITIAL_STATE: PostsState = {
  posts: [],
};

export default function postsReducer(
  state = INITIAL_STATE,
  action: PostsActionTypes
): PostsState {
  switch (action.type) {
    case 'INSERT_POSTS':
      return {
        ...state,
        posts: action.posts,
      };
    case 'INSERT_POST':
      return {
        ...state,
        posts: [action.post, ...state.posts],
      };

    default:
      return state;
  }
}

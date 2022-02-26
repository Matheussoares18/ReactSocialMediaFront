import { PostsActionTypes, PostsState } from '../../interfaces/Posts';

const INITIAL_STATE: PostsState = {
  posts: [],
};

export default function postsReducer(
  // eslint-disable-next-line default-param-last
  state = INITIAL_STATE,
  action: PostsActionTypes
): PostsState {
  switch (action.type) {
    case 'INSERT_POSTS':
      return {
        ...state,
        posts: [...state.posts, ...action.posts],
      };
    case 'INSERT_POST':
      return {
        ...state,
        posts: [action.post, ...state.posts],
      };
    case 'DELETE_POST_LIKE':
      return {
        ...state,
        posts: [
          ...state.posts.map((post) => {
            if (post.id === action.postId) {
              return {
                ...post,
                post_likes: post.post_likes.filter(
                  (like) => like.id !== action.postLikeId
                ),
              };
            }
            return post;
          }),
        ],
      };
    case 'INSERT_POST_LIKE':
      return {
        ...state,
        posts: [
          ...state.posts.map((post) => {
            if (post.id === action.postId) {
              return {
                ...post,
                post_likes: [...post.post_likes, action.postLike],
              };
            }
            return post;
          }),
        ],
      };
    case 'INSERT_POST_COMMENT':
      return {
        ...state,
        posts: [
          ...state.posts.map((post) => {
            if (post.id === action.postId) {
              return {
                ...post,
                post_comments: [...post.post_comments, action.postComment],
              };
            }
            return post;
          }),
        ],
      };
    case 'DELETE_POST_COMMENT':
      return {
        ...state,
        posts: [
          ...state.posts.map((post) => {
            if (post.id === action.postId) {
              return {
                ...post,
                post_comments: [
                  ...post.post_comments.filter(
                    (postComment) => postComment.id !== action.postCommentId
                  ),
                ],
              };
            }
            return post;
          }),
        ],
      };

    default:
      return state;
  }
}

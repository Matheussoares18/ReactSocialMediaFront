export enum ApiRoutes {
  POSTS = '/posts',
  POST_LIKES = '/posts/likes',
  POST_COMMENTS = '/posts/comments',
  GET_POSTS_BY_USER = '/users/posts',
}
export enum SocialUsersApiRoutes {
  USERS = '/social-users/users',
  UPDATE_USER = '/social-users/users',
  GET_USER = '/social-users/users',
  GET_ME = '/social-users/users/me',
  GET_FOLLOW = '/social-users/followers',
  UNFOLLOW_USER = '/social-users/followers',
  FOLLOW_USER = '/social-users/followers',
}
export enum AuthApiRoutes {
  CREATE_CREDENTIALS = '/auth',
  AUTHENTICATE = '/auth/login',
}

export enum SocialPostsApiRoutes {
  POSTS = '/social-posts/posts',
  GET_ALL_POSTS_BY_USER = '/social-posts/posts/posts-by-user',
  CREATE_POST_LIKE = '/social-posts/post-likes',
  DELETE_POST_LIKE = '/social-posts/post-likes',
  CREATE_POST_COMMENT = '/social-posts/post-comments',
  GET_ALL_POST_COMMENTS = '/social-posts/post-comments',
}

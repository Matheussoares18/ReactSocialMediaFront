export enum ApiRoutes {
  POSTS = '/posts',
  POST_LIKES = '/posts/likes',
  POST_COMMENTS = '/posts/comments',
  GET_POSTS_BY_USER = '/users/posts',
}
export enum SocialUsersApiRoutes {
  USERS = '/social-users/users',
  GET_ME = '/social-users/users/me',
}
export enum AuthApiRoutes {
  CREATE_CREDENTIALS = '/auth',
  AUTHENTICATE = '/auth/login',
}
export enum SocialPostsApiRoutes {
  POSTS = '/social-posts/posts',
  CREATE_POST_LIKE = '/social-posts/post-likes',
  DELETE_POST_LIKE = '/social-posts/post-likes',
}

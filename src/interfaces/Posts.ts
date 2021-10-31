export interface Post {
  id: string;
  content: string;
  image: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  post_images: Array<{
    image: string;
    created_at?: string;
  }>;
  post_likes: PostLikes[];
  user: {
    id: string;
    name: string;
    email: string;
    birth_date: string;
    gender: string;
    password: string;
    image: string;
  };
}
export interface PostLikes {
  id: string;
  post_id: string;
  user_id: string;
  user: {
    name: string;
    image: string;
  };
}

export const INSERT_POSTS = 'INSERT_POSTS';
export const INSERT_POST = 'INSERT_POST';

export const INSERT_POST_LIKE = 'INSERT_POST_LIKE';
export const DELETE_POST_LIKE = 'DELETE_POST_LIKE';

export interface InsertPosts {
  type: typeof INSERT_POSTS;
  posts: Post[];
}
export interface InsertPost {
  type: typeof INSERT_POST;
  post: Post;
}
export interface InsertPostLike {
  type: typeof INSERT_POST_LIKE;
  postId: string;
  postLike: PostLikes;
}
export interface DeletePostLike {
  type: typeof DELETE_POST_LIKE;
  postLikeId: string;
  postId: string;
}
export interface PostsState {
  posts: Post[];
}

export type PostsActionTypes =
  | InsertPosts
  | InsertPost
  | InsertPostLike
  | DeletePostLike;

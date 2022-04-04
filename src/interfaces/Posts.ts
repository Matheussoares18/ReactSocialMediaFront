/* eslint-disable camelcase */
import { PostComment } from './PostComment';

export interface PostLikes {
  id: string;
  post_id: string;
  user_id: string;
  users: {
    name: string;
    image: string;
    external_id: string;
  };
}
export interface Post {
  id: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  user_id: string;
  post_images: Array<{
    image: string;
    created_at?: string;
  }>;
  post_likes: PostLikes[];
  post_comments: PostComment[];
  users: {
    id: string;
    name: string;
    image: string;
    external_id: string;
  };
}

export const INSERT_POSTS = 'INSERT_POSTS';
export const INSERT_POST = 'INSERT_POST';

export const REMOVE_POSTS = 'REMOVE_POSTS';

export const INSERT_POST_LIKE = 'INSERT_POST_LIKE';
export const DELETE_POST_LIKE = 'DELETE_POST_LIKE';

export const INSERT_POST_COMMENT = 'INSERT_POST_COMMENT';

export const DELETE_POST_COMMENT = 'DELETE_POST_COMMENT';

export interface InsertPosts {
  type: typeof INSERT_POSTS;
  posts: Post[];
}
export interface InsertPost {
  type: typeof INSERT_POST;
  post: Post;
}
export interface RemovePosts {
  type: typeof REMOVE_POSTS;
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
export interface InsertPostComment {
  type: typeof INSERT_POST_COMMENT;
  postComment: PostComment;
  postId: string;
}

export interface DeletePostComment {
  type: typeof DELETE_POST_COMMENT;
  postCommentId: string;
  postId: string;
}
export interface PostsState {
  posts: Post[];
}

export type PostsActionTypes =
  | InsertPosts
  | InsertPost
  | InsertPostLike
  | DeletePostLike
  | InsertPostComment
  | DeletePostComment
  | RemovePosts;

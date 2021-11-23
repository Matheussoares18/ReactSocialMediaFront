import { PostComment } from '../../interfaces/PostComment';
import {
  DeletePostComment,
  DeletePostLike,
  InsertPost,
  InsertPostComment,
  InsertPostLike,
  InsertPosts,
  Post,
  PostLikes,
} from '../../interfaces/Posts';

export function insertPosts(posts: Post[]): InsertPosts {
  return {
    type: 'INSERT_POSTS',
    posts,
  };
}
export function insertPost(post: Post): InsertPost {
  return {
    type: 'INSERT_POST',
    post,
  };
}

export function insertPostLike(
  postLike: PostLikes,
  postId: string
): InsertPostLike {
  return {
    type: 'INSERT_POST_LIKE',
    postLike,
    postId,
  };
}
export function deletePostLike(
  postLikeId: string,
  postId: string
): DeletePostLike {
  return {
    type: 'DELETE_POST_LIKE',
    postLikeId,
    postId,
  };
}
export function insertPostComment(
  postComment: PostComment,
  postId: string
): InsertPostComment {
  return {
    type: 'INSERT_POST_COMMENT',
    postComment,
    postId,
  };
}
export function deletePostComment(
  postId: string,
  postCommentId: string
): DeletePostComment {
  return {
    type: 'DELETE_POST_COMMENT',
    postId,
    postCommentId,
  };
}

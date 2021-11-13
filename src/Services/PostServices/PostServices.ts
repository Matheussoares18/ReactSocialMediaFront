import { Post } from '../../interfaces/Posts';
import api from '../api';
import { ApiRoutes } from '../ApiRoutes';
import {
  CreatePostComent,
  CreatePostLike,
  CreatePostRequest,
  DeletePostLike,
  GetAllPostLikesRequest,
  GetAllPostRequest,
} from './types';

export const createPost: CreatePostRequest = async (
  post: Pick<Post, 'post_images' | 'content'>
) => {
  return api.post(ApiRoutes.POSTS, {
    ...post,
  });
};

export const getAllPosts: GetAllPostRequest = async (skip: number) => {
  return api.get(`${ApiRoutes.POSTS}/${skip}`);
};

export const createPostLike: CreatePostLike = async (postId: string) => {
  return api.post(ApiRoutes.POST_LIKES, { post_id: postId });
};
export const deletePostLike: DeletePostLike = async (postId: string) => {
  return api.delete(`${ApiRoutes.POST_LIKES}/${postId}`);
};

export const getAllPostLikes: GetAllPostLikesRequest = async (
  postId: string
) => {
  return api.get(`${ApiRoutes.POST_LIKES}/${postId}`);
};
export const createPostComment: CreatePostComent = async (
  postId: string,
  comment: string
) => {
  return api.post(ApiRoutes.POST_COMMENTS, { post_id: postId, comment });
};

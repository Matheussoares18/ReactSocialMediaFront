import { Post } from '../../interfaces/Posts';
import api from '../api';
import { ApiRoutes } from '../ApiRoutes';
import {
  CreatePostLike,
  CreatePostRequest,
  DeletePostLike,
  GetAllPostRequest,
} from './types';

export const createPost: CreatePostRequest = async (
  post: Pick<Post, 'post_images' | 'content'>
) => {
  return api.post(ApiRoutes.POSTS, {
    ...post,
  });
};

export const getAllPosts: GetAllPostRequest = async () => {
  return api.get(ApiRoutes.POSTS);
};

export const createPostLike: CreatePostLike = async (postId: string) => {
  return api.post(ApiRoutes.POST_LIKES, { post_id: postId });
};
export const deletePostLike: DeletePostLike = async (postId: string) => {
  return api.delete(`${ApiRoutes.POST_LIKES}/${postId}`);
};

import { Post } from '../../interfaces/Posts';
import api from '../api';
import { ApiRoutes } from '../ApiRoutes';
import { CreatePostRequest, GetAllPostRequest } from './types';

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

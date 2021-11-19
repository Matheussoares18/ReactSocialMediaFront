import api from '../api';
import { ApiRoutes } from '../ApiRoutes';
import { GetAllPostCommentsRequest } from './types';

export const getAllPostComments: GetAllPostCommentsRequest = async (
  postId: string,
  skip: number
) => {
  return api.get(`${ApiRoutes.POST_COMMENTS}/${postId}/${skip}`);
};

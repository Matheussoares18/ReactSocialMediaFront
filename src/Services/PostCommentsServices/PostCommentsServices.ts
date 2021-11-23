import api from '../api';
import { ApiRoutes } from '../ApiRoutes';
import { DeletePostCommentRequest, GetAllPostCommentsRequest } from './types';

export const getAllPostComments: GetAllPostCommentsRequest = async (
  postId: string,
  skip: number
) => {
  return api.get(`${ApiRoutes.POST_COMMENTS}/${postId}/${skip}`);
};

export const deletePostComment: DeletePostCommentRequest = async (
  postCommentId: string
) => {
  return api.delete(`${ApiRoutes.POST_COMMENTS}/${postCommentId}`);
};

import { AxiosResponse } from 'axios';
import { PostComment } from '../../interfaces/PostComment';

export type GetAllPostCommentsRequest = (
  postId: string,
  skip: number
) => Promise<AxiosResponse<{ postComments: PostComment[]; total: number }>>;

export type DeletePostCommentRequest = (
  commentId: string
) => Promise<AxiosResponse>;

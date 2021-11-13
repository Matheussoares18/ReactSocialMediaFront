import { AxiosResponse } from 'axios';
import { Post, PostComment, PostLikes } from '../../interfaces/Posts';

export interface GetAllPostsResponse {
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
  post_likes: Array<{
    id: string;
    post_id: string;
    user_id: string;
  }>;
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

export type CreatePostRequest = (
  post: Pick<Post, 'post_images' | 'content'>
) => Promise<AxiosResponse<{ post: Post }>>;

export type GetAllPostRequest = () => Promise<AxiosResponse<Post[]>>;

export type CreatePostLike = (
  postId: string
) => Promise<AxiosResponse<PostLikes>>;

export type DeletePostLike = (postId: string) => Promise<AxiosResponse>;

export type GetAllPostLikesRequest = (
  postId: string
) => Promise<AxiosResponse<PostLikes[]>>;

export type CreatePostComent = (
  postId: string,
  comment: string
) => Promise<AxiosResponse<PostComment>>;

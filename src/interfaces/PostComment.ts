/* eslint-disable camelcase */
export interface PostComment {
  id: string;
  comment: string;
  post_id: string;
  user_id: string;
  users: {
    id: string;
    name: string;
    external_id: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
}

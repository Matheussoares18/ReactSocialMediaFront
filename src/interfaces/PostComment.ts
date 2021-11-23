export interface PostComment {
  id: string;
  comment: string;
  post_id: string;
  user_id: string;
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

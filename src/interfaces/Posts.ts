export interface Post {
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
    user: {
      name: string;
    };
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

export const INSERT_POSTS = 'INSERT_POSTS';
export const INSERT_POST = 'INSERT_POST';

export interface InsertPosts {
  type: typeof INSERT_POSTS;
  posts: Post[];
}
export interface InsertPost {
  type: typeof INSERT_POST;
  post: Post;
}
export interface PostsState {
  posts: Post[];
}

export type PostsActionTypes = InsertPosts | InsertPost;

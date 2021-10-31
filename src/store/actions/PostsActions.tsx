import { InsertPost, InsertPosts, Post } from '../../interfaces/Posts';

export function insertPosts(posts: Post[]): InsertPosts {
  return {
    type: 'INSERT_POSTS',
    posts,
  };
}
export function insertPost(post: Post): InsertPost {
  return {
    type: 'INSERT_POST',
    post,
  };
}

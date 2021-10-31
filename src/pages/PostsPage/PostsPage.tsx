import { Header } from '../../components/DefaultComponents/Header/Header';
import { MakeAPostCard } from '../../components/MakeAPostCard/MakeAPostCard';
import { PostCard } from '../../components/PostCard/PostCard';
import { Container, PostsList } from './styles';
import * as PostServices from '../../Services/PostServices/PostServices';
import { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { insertPosts } from '../../store/actions/PostsActions';
import { RootState } from '../../store/reducers';
import { Post } from '../../interfaces/Posts';

export function PostsPage() {
  const posts: Post[] = useSelector((state: RootState) => state.posts.posts);

  const dispatch = useDispatch();

  const getPosts = useCallback(() => {
    PostServices.getAllPosts().then((res) => {
      dispatch(insertPosts(res.data));
    });
  }, [dispatch]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <Container>
      <Header />
      <MakeAPostCard />
      <PostsList>
        {posts.map((item) => (
          <PostCard post={item} />
        ))}
      </PostsList>
    </Container>
  );
}

import { Header } from '../../components/DefaultComponents/Header/Header';
import { MakeAPostCard } from '../../components/MakeAPostCard/MakeAPostCard';
import { PostCard } from '../../components/PostCard/PostCard';
import { Container, PostsList, SpinnerContainer } from './styles';
import * as PostServices from '../../Services/PostServices/PostServices';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { insertPosts } from '../../store/actions/PostsActions';
import { RootState } from '../../store/reducers';
import { Post } from '../../interfaces/Posts';
import { Spinner } from '../../components/DefaultComponents/Spinner/Spinner';
import { useQuery } from '../../hooks/useQuery';
import { ApiRoutes } from '../../Services/ApiRoutes';

export function PostsPage() {
  const posts: Post[] = useSelector((state: RootState) => state.posts.posts);
  const [skip, setSkip] = useState<number>(0);
  const { isLoading, data } = useQuery<{ total: number; posts: Post[] }>({
    path: `${ApiRoutes.POSTS}/${skip}`,

    onComplete: (result) => {
      console.log(result);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  /*  const dispatch = useDispatch(); */
  // const postListsRef = useRef<HTMLDivElement>(null);

  /*   const [totalPosts, setTotalPosts] = useState<number>(0); */

  // const getPosts = useCallback(() => {
  //   PostServices.getAllPosts(0)
  //     .then((res) => {
  //       dispatch(insertPosts(res.data.posts));
  //       setTotalPosts(res.data.total);
  //     })
  //     .catch((err) => {
  //       console.log('Falha ao carregar os posts');
  //     });
  // }, [dispatch]);

  // useEffect(() => {
  //   getPosts();
  // }, [getPosts]);

  // const getDivHeight = useCallback(() => {
  //   const currentPosition = window.scrollY + window.innerHeight;
  //   const postsListHeight = postListsRef.current?.offsetHeight;

  //   const hasPostsYet = skip < totalPosts;

  //   if (currentPosition >= postsListHeight! && hasPostsYet) {
  //     // setLoading(true);
  //     const updateSkipNumber = skip + 15;

  //     PostServices.getAllPosts(updateSkipNumber).then((res) => {
  //       dispatch(insertPosts([...posts, ...res.data.posts]));
  //       setTotalPosts(res.data.total);
  //       setSkip(updateSkipNumber);
  //     });
  //     return;
  //   }
  //   // setLoading(false);
  // }, [setLoading, dispatch, posts, skip, totalPosts]);

  // useEffect(() => {
  //   window.onscroll = getDivHeight;
  // }, [getDivHeight]);

  return (
    <Container>
      <Header />
      <MakeAPostCard />
      <PostsList /* ref={postListsRef} */>
        {data?.posts.map((item) => (
          <PostCard post={item} key={item.id} />
        ))}
      </PostsList>
      {isLoading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
    </Container>
  );
}

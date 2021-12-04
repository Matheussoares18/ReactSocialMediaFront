import { Header } from '../../components/DefaultComponents/Header/Header';
import { MakeAPostCard } from '../../components/MakeAPostCard/MakeAPostCard';
import { PostCard } from '../../components/PostCard/PostCard';
import { Container, PostsList } from './styles';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertPosts } from '../../store/actions/PostsActions';
import { RootState } from '../../store/reducers';
import { Post } from '../../interfaces/Posts';
import { useQuery } from '../../hooks/useQuery';
import { ApiRoutes } from '../../Services/ApiRoutes';
import { LoadingOrError } from '../../components/DefaultComponents/LoadingOrError/LoadingOrError';
import { PostsLoader } from '../../components/DefaultComponents/PostsLoader/PostsLoader';
import { GenericPostsError } from '../../components/DefaultComponents/GenericPostsError/GenericPostsError';

export function PostsPage() {
  const posts: Post[] = useSelector((state: RootState) => state.posts.posts);
  const [skip, setSkip] = useState<number>(0);
  const dispatch = useDispatch();
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const { isLoading, isError, refetch } = useQuery<{
    total: number;
    posts: Post[];
  }>({
    path: `${ApiRoutes.POSTS}/0`,
    onComplete: (result) => {
      setTotalPosts(result.total);
      setSkip(skip + 15);
      dispatch(insertPosts([...posts, ...result.posts]));
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const postListsRef = useRef<HTMLDivElement>(null);

  const getDivHeight = useCallback(async () => {
    const currentPosition = window.scrollY + window.innerHeight;
    const postsListHeight = postListsRef.current?.offsetHeight;

    const hasPostsYet = skip < totalPosts;

    if (currentPosition >= postsListHeight! && hasPostsYet) {
      const result = await refetch(`${ApiRoutes.POSTS}/${skip}`);

      if (result && !isError) {
        const updateSkipNumber = skip + 15;
        setSkip(updateSkipNumber);
      }

      return;
    }
  }, [skip, totalPosts, isError, refetch]);

  useEffect(() => {
    window.onscroll = getDivHeight;
  }, [getDivHeight]);

  return (
    <Container>
      <Header />
      <MakeAPostCard />
      <PostsList ref={postListsRef}>
        <LoadingOrError
          error={{
            isError,
            component: <GenericPostsError />,
          }}
          loading={{
            isLoading,
            component: (
              <>
                <PostsLoader />
                <PostsLoader />
              </>
            ),
          }}
        >
          <>
            {posts?.map((item) => (
              <PostCard post={item} key={item.id} />
            ))}
          </>
        </LoadingOrError>
      </PostsList>
    </Container>
  );
}

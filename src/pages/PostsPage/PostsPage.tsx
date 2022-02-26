import { Header } from 'components/DefaultComponents/Header/Header';
import { MakeAPostCard } from 'components/MakeAPostCard/MakeAPostCard';
import { PostCard } from 'components/PostCard/PostCard';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertPosts } from 'store/actions/PostsActions';
import { RootState } from 'store/reducers';
import { Post } from 'interfaces/Posts';
import { useQuery } from 'hooks/useQuery';
import { SocialPostsApiRoutes } from 'Services/ApiRoutes';
import { LoadingOrError } from 'components/DefaultComponents/LoadingOrError/LoadingOrError';
import { PostsLoader } from 'components/DefaultComponents/PostsLoader/PostsLoader';
import { GenericPostsError } from 'components/DefaultComponents/GenericPostsError/GenericPostsError';
import { CONSTANTS } from 'utils/constants';
import { Container, PostsList } from './styles';

export function PostsPage(): JSX.Element {
  const posts: Post[] = useSelector((state: RootState) => state.posts.posts);
  const [skip, setSkip] = useState<number>(0);
  const dispatch = useDispatch();
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const { isLoading, isError, refetch } = useQuery<{
    total: number;
    posts: Post[];
  }>({
    path: `${SocialPostsApiRoutes.POSTS}?skip=0`,
    onComplete: (result) => {
      setTotalPosts(result.total);
      setSkip(skip + CONSTANTS.postsAmountPerRequest);

      dispatch(insertPosts(result.posts));
    },
  });
  const postListsRef = useRef<HTMLDivElement>(null);

  const getDivHeight = useCallback(async () => {
    const currentPosition = window.scrollY + window.innerHeight;
    const postsListHeight = postListsRef.current?.offsetHeight;

    const hasPostsYet = skip < totalPosts;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!isLoading && currentPosition >= postsListHeight! && hasPostsYet) {
      const result = await refetch(
        `${SocialPostsApiRoutes.POSTS}?skip=${skip}`
      );

      if (result && !isError) {
        const updateSkipNumber = skip + CONSTANTS.postsAmountPerRequest;
        setSkip(updateSkipNumber);
      }
    }
  }, [skip, totalPosts, isError, refetch, isLoading]);

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
            isLoading: isLoading && skip === 0,
            component: (
              <>
                <PostsLoader />
                <PostsLoader />
              </>
            ),
          }}
        >
          {posts.map((item) => (
            <PostCard post={item} key={item.id} />
          ))}
        </LoadingOrError>
      </PostsList>
    </Container>
  );
}

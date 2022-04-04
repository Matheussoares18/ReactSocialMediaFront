import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertPosts, removePosts } from 'store/actions/PostsActions';
import { RootState } from 'store/reducers';
import { RefetchType } from '../../../hooks/useQuery';
import { Post } from '../../../interfaces/Posts';
import { SocialPostsApiRoutes } from '../../../Services/ApiRoutes';
import { PostCard } from '../../PostCard/PostCard';
import { Container } from './styles';

interface ProfilePostsProps {
  posts: Post[];
  totalPosts: number;
  userId: string;
  refetch: RefetchType;
}

export function ProfilePosts({
  posts,
  totalPosts,
  refetch,
  userId,
}: ProfilePostsProps): JSX.Element {
  const [skip, setSkip] = useState<number>(posts?.length);
  const dispatch = useDispatch();
  const reduxPosts: Post[] = useSelector(
    (state: RootState) => state.posts.posts
  );

  const postListsRef = useRef<HTMLDivElement>(null);

  const getDivHeight = useCallback(async () => {
    const currentPosition = window.scrollY + window.innerHeight;
    const postsListHeight = postListsRef.current?.offsetHeight;

    const hasPostsYet = skip < totalPosts;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (currentPosition >= postsListHeight! && hasPostsYet) {
      const result = await refetch(
        `${SocialPostsApiRoutes.GET_ALL_POSTS_BY_USER}?external_id=${userId}&skip=${skip}`,
        undefined,
        false
      );

      if (result) {
        const updateSkipNumber = skip + 30;
        setSkip(updateSkipNumber);
        dispatch(insertPosts([...posts, ...result.posts]));
      }
    }
  }, [skip, totalPosts, refetch, posts, userId, dispatch]);

  const loadPosts = useCallback(() => {
    if (posts && posts.length > 0) {
      dispatch(removePosts());
      dispatch(insertPosts(posts));
    }
  }, [dispatch, posts]);
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    window.onscroll = getDivHeight;
  }, [getDivHeight]);

  return (
    <Container ref={postListsRef}>
      {reduxPosts?.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </Container>
  );
}

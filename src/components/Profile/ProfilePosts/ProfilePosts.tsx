import { useCallback, useEffect, useRef, useState } from 'react';
import { RefetchType } from '../../../hooks/useQuery';
import { Post } from '../../../interfaces/Posts';
import { SocialPostsApiRoutes } from '../../../Services/ApiRoutes';
import { PostCard } from '../../PostCard/PostCard';
import { Container } from './styles';

interface ProfilePostsProps {
  posts: Post[];
  totalPosts: number;
  userId: string;
  refetch: RefetchType<{ total: number; posts: Post[] }>;
}

export function ProfilePosts({
  posts,
  totalPosts,
  refetch,
  userId,
}: ProfilePostsProps): JSX.Element {
  const [postsState, setPosts] = useState<Post[]>([]);
  const [skip, setSkip] = useState<number>(posts?.length);

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
        setPosts([...postsState, ...result.posts]);
      }
    }
  }, [skip, totalPosts, refetch, userId, setPosts, postsState]);

  const loadPosts = useCallback(() => {
    if (posts && posts.length > 0) {
      setPosts([]);
      setPosts(posts);
    }
  }, [setPosts, posts]);
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    window.onscroll = getDivHeight;
  }, [getDivHeight]);

  return (
    <Container ref={postListsRef}>
      {postsState?.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </Container>
  );
}

import { useCallback, useEffect, useRef, useState } from 'react';
import { RefetchType } from '../../../hooks/useQuery';

import { Post } from '../../../interfaces/Posts';
import { ApiRoutes } from '../../../Services/ApiRoutes';

import { PostCard } from '../../PostCard/PostCard';
import { Container } from './styles';

interface ProfilePostsProps {
  posts: Post[];
  totalPosts: number;
  refetch: RefetchType;
}

export function ProfilePosts({
  posts,
  totalPosts,
  refetch,
}: ProfilePostsProps): JSX.Element {
  const [skip, setSkip] = useState<number>(posts?.length);
  const [paginatedPosts, setPaginatedPosts] = useState<Post[] | undefined>(
    posts
  );

  const postListsRef = useRef<HTMLDivElement>(null);

  const getDivHeight = useCallback(async () => {
    const currentPosition = window.scrollY + window.innerHeight;
    const postsListHeight = postListsRef.current?.offsetHeight;

    const hasPostsYet = skip < totalPosts;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (currentPosition >= postsListHeight! && hasPostsYet) {
      const result = await refetch(
        `${ApiRoutes.POSTS}/${skip}`,
        undefined,
        false
      );

      if (result) {
        const updateSkipNumber = skip + 15;
        setSkip(updateSkipNumber);
        setPaginatedPosts([...posts, ...result.posts]);
      }
    }
  }, [skip, totalPosts, refetch, posts]);

  useEffect(() => {
    window.onscroll = getDivHeight;
  }, [getDivHeight]);

  return (
    <Container ref={postListsRef}>
      {paginatedPosts?.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </Container>
  );
}

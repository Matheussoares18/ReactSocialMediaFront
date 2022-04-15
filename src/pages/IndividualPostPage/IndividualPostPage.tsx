/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import { GenericPostsError } from 'components/DefaultComponents/GenericPostsError/GenericPostsError';
import { LoadingOrError } from 'components/DefaultComponents/LoadingOrError/LoadingOrError';
import { PostsLoader } from 'components/DefaultComponents/PostsLoader/PostsLoader';
import { PostCard } from 'components/PostCard/PostCard';
import { useQuery } from 'hooks/useQuery';
import { Post } from 'interfaces/Posts';
import { useParams } from 'react-router-dom';
import { SocialPostsApiRoutes } from 'Services/ApiRoutes';
import { Container } from 'pages/IndividualPostPage/styles';
import { Header } from 'components/DefaultComponents/Header/Header';

interface IndividualPostPageParams {
  postId: string;
}

const IndividualPostPage: React.FC = () => {
  const [post, setPost] = useState<Post>();
  const params = useParams<IndividualPostPageParams>();

  const { hasError, isLoading } = useQuery<Post>({
    path: `${SocialPostsApiRoutes.GET_POST}?post_id=${params.postId}`,
    onComplete: (res) => {
      setPost(res);
    },
  });

  return (
    <LoadingOrError
      error={{
        hasError,
        component: <GenericPostsError />,
      }}
      loading={{
        isLoading,
        component: <PostsLoader />,
      }}
    >
      {post && (
        <>
          <Header />
          <Container>
            <PostCard post={post} key={post?.id} />
          </Container>
        </>
      )}
    </LoadingOrError>
  );
};

export { IndividualPostPage };

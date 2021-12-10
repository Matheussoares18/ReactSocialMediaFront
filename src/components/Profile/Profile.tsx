import { Route, useParams, useRouteMatch } from 'react-router-dom';

import { LoadingOrError } from 'components/DefaultComponents/LoadingOrError/LoadingOrError';
import { ProfileMenu } from 'components/Profile/ProfileMenu/ProfileMenu';
import { ProfilePosts } from 'components/Profile/ProfilePosts/ProfilePosts';
import { Container } from './styles';
import { UserInfos } from 'components/Profile/UserInfos/UserInfos';
import { Spinner } from 'components/DefaultComponents/Spinner/Spinner';
import { ApiRoutes } from 'Services/ApiRoutes';
import { GenericPostsError } from 'components/DefaultComponents/GenericPostsError/GenericPostsError';
import { useQuery } from 'hooks/useQuery';
import { Post } from 'interfaces/Posts';

interface ProfileParams {
  id: string;
}

export function Profile() {
  const pageParams = useParams<ProfileParams>();
  const { url } = useRouteMatch();
  const { data, isError, isLoading, refetch } = useQuery<{
    id: string;
    name: string;
    biography?: string;
    image?: string;
  }>({
    path: `${ApiRoutes.USERS}/${pageParams.id}`,
  });
  const {
    data: postsResult,
    isError: isErrorPosts,
    isLoading: isLoadingPosts,
    refetch: refetchPosts,
  } = useQuery<{
    total: number;
    posts: Post[];
  }>({
    path: `${ApiRoutes.GET_POSTS_BY_USER}/${pageParams.id}/${0}`,
  });

  return (
    <Container>
      <LoadingOrError
        error={{ component: <GenericPostsError />, isError }}
        loading={{ component: <Spinner />, isLoading }}
      >
        <>
          <UserInfos
            id={data?.id as string}
            name={data?.name as string}
            biography={data?.biography}
            image={data?.image}
            refetch={refetch}
            refetchPosts={refetchPosts}
          />
        </>
      </LoadingOrError>
      <ProfileMenu />

      <Route path={`${url}/posts`}>
        <LoadingOrError
          error={{ component: <GenericPostsError />, isError: isErrorPosts }}
          loading={{
            component: (
              <div style={{ marginTop: '30px' }}>
                <Spinner />
              </div>
            ),
            isLoading: isLoadingPosts,
          }}
        >
          <>
            <ProfilePosts
              posts={postsResult?.posts as Post[]}
              totalPosts={postsResult?.total as number}
              refetch={refetchPosts}
            />
          </>
        </LoadingOrError>
      </Route>
    </Container>
  );
}

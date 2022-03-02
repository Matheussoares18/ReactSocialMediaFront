import { useParams } from 'react-router-dom';
import { LoadingOrError } from 'components/DefaultComponents/LoadingOrError/LoadingOrError';
import { ProfilePosts } from 'components/Profile/ProfilePosts/ProfilePosts';
import { UserInfos } from 'components/Profile/UserInfos/UserInfos';
import { Spinner } from 'components/DefaultComponents/Spinner/Spinner';
import { SocialPostsApiRoutes, SocialUsersApiRoutes } from 'Services/ApiRoutes';
import { GenericPostsError } from 'components/DefaultComponents/GenericPostsError/GenericPostsError';
import { useQuery } from 'hooks/useQuery';
import { Post } from 'interfaces/Posts';
import { UserFollower } from 'interfaces/AuthUser';
import { Container } from './styles';

interface ProfileParams {
  id: string;
}

export function Profile(): JSX.Element {
  const pageParams = useParams<ProfileParams>();
  const { data, isError, isLoading, refetch } = useQuery<{
    id: string;
    name: string;
    biography?: string;
    image?: string;
    // eslint-disable-next-line camelcase
    user_followers: UserFollower[];
    followersAmount: number;
  }>({
    path: `${SocialUsersApiRoutes.GET_USER}?id=${pageParams.id}`,
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
    path: `${SocialPostsApiRoutes.GET_ALL_POSTS_BY_USER}?external_id=${
      pageParams.id
    }&skip=${0}`,
  });

  return (
    <Container>
      <LoadingOrError
        error={{
          component: <GenericPostsError />,
          isError: isError || isErrorPosts,
        }}
        loading={{
          component: <Spinner />,
          isLoading: isLoading || isLoadingPosts,
        }}
      >
        <UserInfos
          followersAmount={data?.followersAmount ?? 0}
          id={data?.id as string}
          name={data?.name as string}
          biography={data?.biography}
          image={data?.image}
          refetch={refetch}
          refetchPosts={refetchPosts}
          userFollowers={data?.user_followers ?? []}
        />

        <ProfilePosts
          posts={postsResult?.posts as Post[]}
          totalPosts={postsResult?.total as number}
          refetch={refetchPosts}
          userId={pageParams.id}
        />
      </LoadingOrError>
    </Container>
  );
}

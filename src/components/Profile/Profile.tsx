import { useParams } from 'react-router-dom';
import { useQuery } from '../../hooks/useQuery';
import { LoadingPostsError } from '../../pages/PostsPage/styles';
import { ReactComponent as PostErrorEmote } from '../../assets/postErrorEmote.svg';
import { LoadingOrError } from '../DefaultComponents/LoadingOrError/LoadingOrError';
import { ProfileMenu } from './ProfileMenu/ProfileMenu';
import { ProfilePosts } from './ProfilePosts/ProfilePosts';
import { Container } from './styles';
import { UserInfos } from './UserInfos/UserInfos';
import { Spinner } from '../DefaultComponents/Spinner/Spinner';

interface ProfileParams {
  id: string;
}

const PostsError = () => (
  <LoadingPostsError>
    <div className="text-and-emote">
      <PostErrorEmote className="emote" />
      <p>
        Estamos com dificuldades em exibir esse conteúdo, alguém derrubou o
        servidor, porém não se preocupe! estamos em processo de levantamento.
      </p>
    </div>
  </LoadingPostsError>
);

export function Profile() {
  const pageParams = useParams<ProfileParams>();
  const { data, isError, isLoading } = useQuery<{ name: string }>({
    path: `/users/${pageParams.id}`,
  });
  return (
    <Container>
      <LoadingOrError
        error={{ component: <PostsError />, isError }}
        loading={{ component: <Spinner />, isLoading }}
      >
        <>
          <UserInfos username={data?.name as string} />
          <ProfileMenu />
          <ProfilePosts />
        </>
      </LoadingOrError>
    </Container>
  );
}

import { Header } from 'components/DefaultComponents/Header/Header';
import { Profile } from 'components/Profile/Profile';
import { useUserInfos } from 'hooks/useUserInfos';
import { Container } from './styles';

export function ProfilePage(): JSX.Element {
  const authUser = useUserInfos();
  return (
    <Container>
      {authUser?.token && <Header />}
      <Profile />
    </Container>
  );
}

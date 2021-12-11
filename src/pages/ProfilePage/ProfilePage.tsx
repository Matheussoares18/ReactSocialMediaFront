import { useSelector } from 'react-redux';
import { Header } from 'components/DefaultComponents/Header/Header';
import { Profile } from 'components/Profile/Profile';
import { AuthUser } from 'interfaces/AuthUser';
import { RootState } from 'store/reducers';

import { Container } from './styles';

export function ProfilePage(): JSX.Element {
  const authUser: AuthUser | undefined = useSelector(
    (state: RootState) => state.authUser.authUser
  );
  return (
    <Container>
      {authUser?.token && <Header />}
      <Profile />
    </Container>
  );
}

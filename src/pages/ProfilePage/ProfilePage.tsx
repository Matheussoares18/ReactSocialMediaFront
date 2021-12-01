import { Header } from '../../components/DefaultComponents/Header/Header';
import { Profile } from '../../components/Profile/Profile';

import { Container } from './styles';

export function ProfilePage() {
  return (
    <Container>
      <Header />
      <Profile />
    </Container>
  );
}

import { Link } from 'react-router-dom';
import { Container, Content, Links, Logo, SearchContainer } from './styles';
import { ReactComponent as Search } from '../../../assets/Menu/search.svg';
import { ReactComponent as NotificationIcon } from '../../../assets/Menu/notificationIcon.svg';
import { ReactComponent as Messages } from '../../../assets/Menu/messages.svg';
import { ReactComponent as ExpandIcon } from '../../../assets/Menu/expandIcon.svg';
import { UserPicture } from '../UserPicture/UserPicture';

export function Header() {
  return (
    <Container>
      <Content>
        <SearchContainer>
          <div className="content">
            <Search className="search-icon" />
            <input type="text" placeholder="Pesquisar na SocialMedia" />
          </div>
        </SearchContainer>
        <Logo>Social Media</Logo>
        <Links>
          <Link className="profile" to="/profile">
            <div className="profile-icon">
              <UserPicture />
              <span>Matheus</span>
            </div>
          </Link>
          <div className="container">
            <Link className="commom-icons" to="/notifications">
              <NotificationIcon className="icon" />
            </Link>
            <Link className="commom-icons" to="/">
              <Messages className="icon" />
            </Link>
            <Link className="commom-icons" to="/">
              <ExpandIcon className="icon" />
            </Link>
          </div>
        </Links>
      </Content>
    </Container>
  );
}

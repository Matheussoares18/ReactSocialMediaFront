/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Switch from 'react-switch';
import { useDispatch, useSelector } from 'react-redux';
import { IoExitOutline } from 'react-icons/io5';
import { ReactComponent as Search } from 'assets/Menu/search.svg';
import { ReactComponent as NotificationIcon } from 'assets/Menu/notificationIcon.svg';
import { ReactComponent as Messages } from 'assets/Menu/messages.svg';
import { ReactComponent as ExpandIcon } from 'assets/Menu/expandIcon.svg';
import { UserPicture } from 'components/DefaultComponents/UserPicture/UserPicture';
import { AuthUser, Themes } from 'interfaces/AuthUser';
import { RootState } from 'store/reducers';
import { logout } from 'store/actions/AuthUserAction';
import { AuthRoutes, PublicRoutes } from 'Routes/RoutesEnum';
import DropMenuItem from './DropMenuItem/DropMenuItem';
import {
  Container,
  Content,
  Dimmer,
  DropMenu,
  DropMenuContainer,
  Links,
  Logo,
  SearchContainer,
} from './styles';

export function Header(): JSX.Element {
  const authUser: AuthUser | undefined = useSelector(
    (state: RootState) => state.authUser.authUser
  );

  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(false);
  const [theme, setTheme] = useState<Themes>(
    localStorage.getItem('theme') as Themes
  );
  const history = useHistory();
  const dispatch = useDispatch();

  function changeTheme(themeParam?: Themes) {
    if (themeParam && themeParam === 'dark') {
      localStorage.setItem('theme', Themes.LIGHT);
      setTheme(Themes.LIGHT);
      window.location.reload();
      return;
    }
    localStorage.setItem('theme', Themes.DARK);

    setTheme(Themes.DARK);
    window.location.reload();
  }
  const redirectToHome = () => {
    window.location.href = `${AuthRoutes.POSTS}`;
  };

  return (
    <Container>
      <Content>
        <SearchContainer>
          <div className='content'>
            <Search className='search-icon' />
            <input type='text' placeholder='Pesquisar na SocialMedia' />
          </div>
        </SearchContainer>
        <Logo onClick={redirectToHome}>Social Media</Logo>
        <Links>
          <label className='profile' htmlFor='user-image-input'>
            <button
              type='button'
              className='profile-icon'
              onClick={() =>
                history.push(`${PublicRoutes.PROFILE}/${authUser?.id}/posts`)
              }
            >
              <UserPicture source={authUser?.image} />
              <input
                type='file'
                style={{ display: 'none' }}
                id='user-image-input'
                /* onChange={(e) => {
                  console.log(e);
                  handleUpdateUserImage(e.target!.files![0]!);
                }} */
              />
              <span>
                {authUser && authUser!.name!.length > 6
                  ? authUser!.name!.substring(0, 7)
                  : authUser!.name}
              </span>
            </button>
          </label>
          <div className='container'>
            <Link className='commom-icons' to='/notifications'>
              <NotificationIcon className='icon' />
            </Link>
            <Link className='commom-icons' to='/'>
              <Messages className='icon' />
            </Link>

            <button
              type='button'
              className='commom-icons'
              style={{ cursor: 'pointer' }}
              onClick={() => setMenuIsVisible(!menuIsVisible)}
            >
              <ExpandIcon className='icon' />
            </button>
            {menuIsVisible && (
              <DropMenuContainer>
                <DropMenu>
                  <DropMenuItem label='Modo escuro'>
                    <Switch
                      onChange={() =>
                        changeTheme(
                          localStorage.getItem('theme') as Themes | undefined
                        )
                      }
                      checked={theme === Themes.DARK}
                      height={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      onColor='#0caacd'
                      width={40}
                    />
                  </DropMenuItem>
                  <DropMenuItem
                    label='Sair'
                    icon={IoExitOutline}
                    onClick={() => dispatch(logout())}
                  />
                </DropMenu>
                <Dimmer onClick={() => setMenuIsVisible(false)} />
              </DropMenuContainer>
            )}
          </div>
        </Links>
      </Content>
    </Container>
  );
}

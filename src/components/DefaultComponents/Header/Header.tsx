import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Switch from 'react-switch';
import { useDispatch, useSelector } from 'react-redux';
import { IoExitOutline } from 'react-icons/io5';
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
import { ReactComponent as Search } from '../../../assets/Menu/search.svg';
import { ReactComponent as NotificationIcon } from '../../../assets/Menu/notificationIcon.svg';
import { ReactComponent as Messages } from '../../../assets/Menu/messages.svg';
import { ReactComponent as ExpandIcon } from '../../../assets/Menu/expandIcon.svg';
import { UserPicture } from '../UserPicture/UserPicture';
import { AuthUser, Themes } from '../../../interfaces/AuthUser';
import { RootState } from '../../../store/reducers';
import * as UserServices from '../../../Services/UserServices/UserServices';
import {
  changeTheme,
  insertUser,
  logout,
} from '../../../store/actions/AuthUserAction';
import DropMenuItem from './DropMenuItem/DropMenuItem';

export function Header() {
  const authUser: AuthUser | undefined = useSelector(
    (state: RootState) => state.authUser.authUser
  );
  const [image, setImage] = useState('');
  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(false);
  const [theme, setTheme] = useState<Themes>(
    localStorage.getItem('theme') as Themes
  );
  const dispatch = useDispatch();

  function getBase64(file: File) {
    let url = '';

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      url = reader.result as string;
      setImage(url);
    };
  }
  async function handleUpdateUserImage(e?: File) {
    if (!e) {
      return;
    }
    getBase64(e);
  }
  const updateImage = useCallback(
    async (url: string) => {
      if (image.length > 0) {
        try {
          await UserServices.updateUserImage(url);
          dispatch(insertUser({ ...authUser!, image: image }));
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      }
    },
    [dispatch, authUser, image]
  );
  useEffect(() => {
    if (image.length > 0) {
      updateImage(image);
    }
  }, [image]);

  function changeTheme(theme?: Themes) {
    if (theme && theme === 'dark') {
      localStorage.setItem('theme', Themes.LIGHT);
      setTheme(Themes.LIGHT);
      window.location.reload();
      return;
    }
    localStorage.setItem('theme', Themes.DARK);

    setTheme(Themes.DARK);
    window.location.reload();
  }

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
          <label className="profile" htmlFor="user-image-input">
            <div className="profile-icon">
              <UserPicture source={authUser?.image} />
              <input
                type="file"
                style={{ display: 'none' }}
                id="user-image-input"
                onChange={(e) => {
                  console.log(e);
                  handleUpdateUserImage(e.target!.files![0]!);
                }}
              />
              <span>
                {authUser && authUser!.name!.length > 6
                  ? authUser!.name!.substring(0, 7)
                  : authUser!.name}
              </span>
            </div>
          </label>
          <div className="container">
            <Link className="commom-icons" to="/notifications">
              <NotificationIcon className="icon" />
            </Link>
            <Link className="commom-icons" to="#">
              <Messages className="icon" />
            </Link>

            <button
              type="button"
              className="commom-icons"
              style={{ cursor: 'pointer' }}
              onClick={() => setMenuIsVisible(!menuIsVisible)}
            >
              <ExpandIcon className="icon" />
            </button>
            {menuIsVisible && (
              <DropMenuContainer>
                <DropMenu>
                  <DropMenuItem label="Modo escuro">
                    <Switch
                      onChange={() =>
                        changeTheme(
                          localStorage.getItem('theme') as Themes | undefined
                        )
                      }
                      checked={theme === Themes.DARK ? true : false}
                      height={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      onColor="#0caacd"
                      width={40}
                    />
                  </DropMenuItem>
                  <DropMenuItem
                    label="Sair"
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

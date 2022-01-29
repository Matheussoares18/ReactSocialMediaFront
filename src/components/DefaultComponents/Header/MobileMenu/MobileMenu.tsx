import React, { useState } from 'react';
import DropMenuItem from 'components/DefaultComponents/Header/DropMenuItem/DropMenuItem';
import {
  MobileContainer,
  MobileMenuContent,
} from 'components/DefaultComponents/Header/MobileMenu/styles';
import { UserPicture } from 'components/DefaultComponents/UserPicture/UserPicture';
import { useUserInfos } from 'hooks/useUserInfos';
import Switch from 'react-switch';
import { Themes } from 'interfaces/AuthUser';
import { IoExitOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { logout } from 'store/actions/AuthUserAction';
import { Link } from 'react-router-dom';
import { PublicRoutes } from 'Routes/RoutesEnum';

const MobileMenu: React.FC = () => {
  const dispatch = useDispatch();
  const authUser = useUserInfos();
  const [theme, setTheme] = useState<Themes>(
    localStorage.getItem('theme') as Themes
  );

  const changeTheme = (themeParam?: Themes) => {
    if (themeParam && themeParam === 'dark') {
      localStorage.setItem('theme', Themes.LIGHT);
      setTheme(Themes.LIGHT);
      window.location.reload();
      return;
    }
    localStorage.setItem('theme', Themes.DARK);

    setTheme(Themes.DARK);
    window.location.reload();
  };

  return (
    <MobileContainer>
      <MobileMenuContent>
        <div className='profile-items'>
          <UserPicture classname='profile-picture' source={authUser?.image} />
          <div className='profile-infos'>
            <span className='username'>{authUser?.name}</span>
            <Link
              to={`${PublicRoutes.PROFILE}/${authUser?.id}/posts`}
              className='profile-link'
            >
              Ir para o seu perfil{' '}
            </Link>
          </div>
        </div>
        <DropMenuItem label='Modo escuro'>
          <Switch
            onChange={() =>
              changeTheme(localStorage.getItem('theme') as Themes | undefined)
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
      </MobileMenuContent>
    </MobileContainer>
  );
};

export default MobileMenu;

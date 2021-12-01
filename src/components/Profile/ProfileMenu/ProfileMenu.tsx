import { NavLink, useRouteMatch } from 'react-router-dom';
import { Container } from './styles';

import { BiListUl } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { MdPeopleOutline } from 'react-icons/md';

export function ProfileMenu() {
  const { url } = useRouteMatch();

  return (
    <Container>
      <NavLink
        to={`${url}/posts`}
        className="menu-item"
        activeClassName="menu-item-active"
      >
        <BiListUl className="icon" />
        Posts
      </NavLink>
      <NavLink
        to={`${url}/likes`}
        className="menu-item"
        activeClassName="menu-item-active"
      >
        <AiOutlineHeart
          className="icon"
          /* style={{ width: '21px', height: '21px' }} */
        />
        Curtidas
      </NavLink>
      <NavLink
        to={`${url}/markings`}
        className="menu-item"
        activeClassName="menu-item-active"
      >
        <MdPeopleOutline className="icon" />
        Marcações
      </NavLink>
    </Container>
  );
}

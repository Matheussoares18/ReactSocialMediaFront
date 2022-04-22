import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled(NavLink)`
  display: flex;
  padding: 1.5rem;
  column-gap: 1rem;
  align-items: center;
  text-decoration: none;

  &.active {
    background-color: ${({ theme }) => theme.menuHoverColor};
  }

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.menuHoverColor};
  }

  .profile-picture {
    border-radius: 50%;
    width: 3.125rem;
    height: 3.125rem;
  }
  .name-and-last-message {
    display: flex;
    flex-direction: column;
    span {
      margin-bottom: 0.2rem;
      font-size: 1rem;
      color: ${({ theme }) => theme.primaryText};
    }
    p {
      color: ${({ theme }) => theme.labelText};
      font-size: 0.8rem;
    }
  }
`;

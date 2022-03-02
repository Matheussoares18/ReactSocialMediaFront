import styled from 'styled-components';
import { colors } from 'styles/colors';

interface ButtonProps {
  alreadyFollowing: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 0.5rem;

  background: ${({ alreadyFollowing }) =>
    alreadyFollowing ? colors.mainBlue : 'transparent'};
  border: solid 1px ${colors.mainBlue};
  color: ${({ alreadyFollowing }) =>
    alreadyFollowing ? colors.white : colors.mainBlue};
  border-radius: 25px;

  width: 6.75rem;
  height: 3rem;
  font-weight: 600;

  &:focus {
    outline: 2px solid ${colors.mainBlue};
  }

  .icon {
    width: 20px;
    height: 20px;

    fill: ${({ alreadyFollowing }) =>
      alreadyFollowing ? colors.mainBlue : colors.white};
  }
`;

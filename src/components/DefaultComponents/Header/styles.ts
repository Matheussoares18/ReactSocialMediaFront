import styled from 'styled-components';
import { colors } from 'styles/colors';
import { breakpoints } from 'styles/global';

export const Container = styled.header`
  width: 100%;
  box-shadow: 0px 4px 4px rgba(153, 153, 153, 0.25);
  height: 3.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: calc(100% - 3.5rem);
  height: 100%;
`;
export const SearchContainer = styled.div`
  width: 13.75rem;
  height: 2.188rem;

  background: ${({ theme }) => theme.commentBox};
  color: ${({ theme }) => theme.inputTextColor};
  border-radius: 23px;

  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 11.875rem;

  @media ${breakpoints.tablet} {
    display: none;
  }

  .content {
    width: calc(100% - 20px);
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .search-icon {
      fill: #b4b4b5;
    }
    input {
      width: 100%;
      height: 74%;
      color: ${({ theme }) => theme.inputTextColor};
      background: transparent;
      border: none;
      padding-left: 0.375rem;
      &:focus {
        outline: none;
      }
      &:placeholder {
        font-family: var(--roboto-font-family);
        font-weight: 400;
        font-size: 0.875rem;
        color: #7a7a7a;
      }
    }
  }
`;
export const SearchContainerMobile = styled.button`
  height: 2.188rem;
  width: 2.188rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.commentBox};
  color: ${({ theme }) => theme.inputTextColor};
  border: none;
  display: none;

  @media ${breakpoints.tablet} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-icon {
    fill: #b4b4b5;
    height: 20px;
    width: 20px;
  }
`;
export const MobileMenuIconContainer = styled.button`
  height: 2.188rem;
  width: 2.188rem;
  background: ${colors.mainBlue};
  border-radius: 23px;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  display: none;

  @media ${breakpoints.tablet} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export const MobileContainer = styled.div`
  background: ${({ theme }) => theme.body};
  position: absolute;
  top: 3.5rem;
  height: 100vh;
  width: 100vw;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 3.125rem;
`;
export const MobileMenuContent = styled.nav`
  width: calc(100% - 3.75rem);
  height: 100%;

  .profile-items {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    column-gap: 1.5rem;
    .profile-picture {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
    }
    .profile-infos {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      row-gap: 0.4rem;

      .username {
        color: ${({ theme }) => theme.primaryText};
        font-size: 2rem;
        font-weight: 300;
      }
      .profile-link {
        font-size: 1.2rem;
        color: ${({ theme }) => theme.labelText};
        text-decoration: underline;
      }
    }
  }
`;
export const Logo = styled.button`
  font-family: 'Pinyon Script', sans-serif;
  font-weight: 400;
  font-size: 2.25rem;
  color: ${colors.mainBlue};
  align-self: end;
  background: transparent;
  border: none;
`;
export const Links = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 0.875rem;
  @media ${breakpoints.tablet} {
    display: none;
  }
  .profile {
    width: 7.688rem;
    height: 2.188rem;
    background: ${colors.mainBlue};
    border-radius: 23px;
    text-decoration: none;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      filter: brightness(0.8);
    }

    .profile-icon {
      display: flex;
      width: calc(100% - 0.625rem);
      height: calc(100% - 0.375rem);
      align-items: center;
      text-decoration: none;
      border: none;
      background: transparent;

      img {
        width: 2.063rem;
        height: 1.875rem;
        border-radius: 1.875rem;
      }

      span {
        margin-left: 0.625rem;
        font-family: var(--roboto-font-family);
        font-size: 0.875rem;
        color: #ffffff;
      }
    }
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 0.438rem;

    .commom-icons {
      background: ${colors.mainBlue};
      border: none;
      border-radius: 23px;
      height: 2.188rem;
      width: 2.188rem;
      display: flex;
      justify-content: center;
      align-items: center;

      .icon {
        fill: #ffffff;
      }
    }
  }
`;
export const DropMenuContainer = styled.div`
  position: absolute;
  right: 30px;
  top: 68px;
`;

export const DropMenu = styled.div`
  background: ${({ theme }) => theme.body};
  box-shadow: 0px 3px 4px 5px rgb(153 153 153 / 25%);
  width: 13.5rem;
  height: 18.75rem;

  position: relative;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  z-index: 2;
`;
export const Dimmer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1;
`;

import styled from 'styled-components';

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
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;

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

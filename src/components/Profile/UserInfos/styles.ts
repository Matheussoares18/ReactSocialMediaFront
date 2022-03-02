import styled from 'styled-components';
import { colors } from 'styles/colors';
import { breakpoints } from 'styles/global';

export const Container = styled.div`
  width: 80%;
  max-width: 56rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 2rem;

  @media ${breakpoints.tablet} {
    flex-direction: column;
    row-gap: 1.5rem;
  }
`;
export const Top = styled.div`
  display: flex;
  column-gap: 1.375rem;

  @media ${breakpoints.tablet} {
    flex-direction: column;
    align-items: center;
    row-gap: 1.5rem;
  }
  .user-img {
    width: 126px;
    height: 129px;
    border-radius: 50%;
    min-width: 126px;
  }
  .user-infos {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    .username {
      display: flex;
      align-items: center;
      column-gap: 15px;

      h2 {
        font-weight: 500;
        color: #0caacd;
      }

      .icon {
        fill: #0caacd;

        &:hover {
          cursor: pointer;
        }
      }
    }
    p {
      color: ${({ theme }) => theme.labelText};
      line-height: 1.375rem;
      min-width: 380px;

      @media ${breakpoints.tablet} {
        min-width: 0px;
      }
    }
  }
`;
export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  .followers-container {
    display: flex;
    flex-direction: column;
    row-gap: 0.375rem;
  }

  /* .follow {
    width: 6.75rem;
    height: 3rem;
  } */
`;
export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 0.375rem;

  .message-button {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 0.5rem;

    background: transparent;
    border: solid 1px ${colors.mainBlue};
    color: ${colors.mainBlue};
    border-radius: 25px;

    width: 3.125rem;
    height: 3.125rem;
    font-weight: 600;

    &:focus {
      outline: 2px solid ${colors.mainBlue};
    }

    .icon {
      width: 25px;
      height: 25px;
    }
  }
`;

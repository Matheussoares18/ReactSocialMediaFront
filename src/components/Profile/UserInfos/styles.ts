import styled from 'styled-components';
import { breakpoints } from 'styles/global';

export const Container = styled.div`
  width: 80%;
  max-width: 56rem;

  display: flex;
  justify-content: center;
  column-gap: 4.5rem;

  @media ${breakpoints.tablet} {
    flex-direction: column;
    row-gap: 1.5rem;
  }
`;
export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.375rem;

  @media ${breakpoints.tablet} {
    flex-direction: row;
    align-items: center;
    column-gap: 1.5rem;
  }
  .user-img {
    width: 126px;
    height: 129px;
    border-radius: 50%;
  }
  .followers-container {
    display: flex;
    flex-direction: column;
    row-gap: 0.375rem;
  }
`;
export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
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
    max-width: 23.75rem;
    line-height: 1.375rem;
    min-width: 380px;

    @media ${breakpoints.tablet} {
      min-width: 0px;
    }
  }
`;

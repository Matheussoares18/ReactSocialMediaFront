import styled from 'styled-components';
import { breakpoints } from 'styles/global';

export const Container = styled.div`
  width: calc(100% - 2.25rem);
  border-top: 0.063rem solid ${({ theme }) => theme.lines};

  border-bottom: 0.063rem solid ${({ theme }) => theme.lines};
  padding: 1.25rem 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${breakpoints.mobileMedium} {
    flex-direction: column;
    row-gap: 1.2rem;
  }

  .user-and-input {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 0.75rem;
    width: 100%;
    img {
      width: 1.5rem;
      height: 1.438rem;
      border-radius: 4.063rem;
    }
    input {
      border: none;
      width: 100%;
      background: ${({ theme }) => theme.inputBackground};
      color: ${({ theme }) => theme.inputTextColor};
      &:focus {
        outline: none;
      }

      font-family: var(--roboto-font-family);
      font-weight: 400;
      font-size: 0.813rem;

      &:placeholder {
        color: #7a7a7a;
      }
    }
  }
  button {
    width: 11rem;
    height: 2.063rem;

    border: none;
    background: #0caacd;
    border-radius: 1.125rem;

    font-family: var(--roboto-font-family);
    font-size: 0.813rem;
    color: #ffffff;
    font-weight: bold;

    @media ${breakpoints.mobileMedium} {
      width: 100%;
    }

    &:hover {
      filter: brightness(0.8);
    }
  }
`;

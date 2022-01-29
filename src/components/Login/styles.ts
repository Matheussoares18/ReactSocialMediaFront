import styled from 'styled-components';
import { breakpoints } from 'styles/global';

export const Container = styled.main`
  display: flex;

  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Content = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  h1 {
    font-family: 'Pinyon Script', sans-serif;
    font-weight: 400;
    font-size: 6rem;
    color: #0caacd;

    @media ${breakpoints.tablet} {
      font-size: 3.5rem;
    }
  }

  .inputs {
    display: flex;
    flex-direction: column;
    row-gap: 1.25rem;
    width: 100%;
    max-width: 23.75rem;
    margin-top: 40px;

    @media ${breakpoints.tablet} {
      width: 80%;
    }
  }
  .submit-button {
    width: 100%;
    max-width: 23.75rem;
    background: #0caacd;
    height: 33px;
    margin-top: 50px;
    border: none;
    border-radius: 0.75rem;
    font-family: var(--roboto-font-family);
    font-size: 0.875rem;
    font-weight: bold;
    color: #ffffff;

    @media ${breakpoints.tablet} {
      width: 80%;
    }
  }

  .link-container {
    margin-top: 20px;
    width: 100%;
    max-width: 23.75rem;

    display: flex;
    justify-content: flex-start;

    @media ${breakpoints.tablet} {
      justify-content: center;
    }
    span {
      font-family: var(--roboto-font-family);
      font-size: 0.875rem;

      font-weight: bold;
      color: #929292;
      font-weight: 300;

      .register-link {
        color: #0caacd;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

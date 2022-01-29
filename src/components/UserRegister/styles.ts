import styled from 'styled-components';
import { breakpoints } from 'styles/global';

export const Container = styled.form`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  header {
    width: calc(100% - 120px);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-top: 70px;

    &:hover {
      cursor: pointer;
    }

    .arrow-back {
      margin-right: 5px;
      fill: #0caacd;
      width: 27px;
      height: 27px;
    }

    button {
      font-family: var(--roboto-font-family);
      color: var(--blue);
      font-size: 1.125rem;
      font-weight: 400;

      border: none;
      background: transparent;
      display: flex;
      align-items: center;
    }
  }
`;
export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 100px;

  h1 {
    font-family: 'Pinyon Script', cursive;
    font-size: 96px;
    font-weight: 400;
    color: #0caacd;

    @media ${breakpoints.tablet} {
      font-size: 3.5rem;
    }
  }

  .inputs {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: 3.75rem;
    min-width: 500px;
    row-gap: 24px;

    width: 100%;
    max-width: 50rem;

    @media ${breakpoints.tablet} {
      width: 80%;
      min-width: 0;
    }

    .input-row {
      display: flex;

      width: 100%;
      column-gap: 20px;
      align-items: center;
    }
  }
`;

export const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  align-items: center;
  width: calc(100% - 240px);
  height: 100%;

  @media ${breakpoints.tablet} {
    width: 85%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .back-button {
    width: 120px;
    height: 45px;

    background: #ebebeb;
    border-radius: 12px;

    border: none;
    margin-right: 20px;

    color: #6a6a6a;
    font-weight: 700;
    font-size: 0.875rem;
    font-family: var(--roboto-font-family);

    @media ${breakpoints.tablet} {
      width: 167px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .button {
    width: 167px;
    height: 45px;
    background: var(--blue);

    border-radius: 0.75rem;
    color: white;
    border: none;
    font-weight: 700;
    font-size: 0.875rem;
    font-family: var(--roboto-font-family);
  }
`;

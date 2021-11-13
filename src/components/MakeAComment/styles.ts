import styled from 'styled-components';

export const Container = styled.div`
  width: calc(100% - 2.25rem);
  border-top: 0.063rem solid #e1e2e2;

  border-bottom: 0.063rem solid #e1e2e2;
  padding: 1.25rem 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
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

    &:hover {
      filter: brightness(0.8);
    }
  }
`;

import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  width: 100%;
  height: 100%;
`;

export const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: solid 1px ${({ theme }) => theme.lines};
  h1 {
    width: calc(100% - 2.2rem);
    padding-top: 1.5rem;
    padding-bottom: 1rem;

    font-size: 1.5rem;
    font-weight: 100;
    color: #0caacd;
  }
`;

export const ModalContent = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding-top: 2.5rem;

  .content {
    display: flex;
    justify-content: center;
    width: calc(100% - 6.5rem);
    column-gap: 50px;
    .input-container {
      width: 1px;
    }
    .user-img {
      width: 7.875rem;
      height: 8.063rem;
      border-radius: 50%;
      margin-bottom: 40px;
    }

    .inputs {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      row-gap: 1.25rem;
    }
  }
`;
interface BiographInputContainerProps {
  hasError: boolean;
}

export const BiographInputContainer = styled.div<BiographInputContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;

  label {
    font-family: var(--roboto-font-family);
    font-weight: 400;
    font-size: 0.875rem;
    color: ${(prop) => (prop.hasError ? '#952c2c' : '#929292')};
    margin-bottom: 0.313rem;
  }
  textarea {
    background-color: ${({ theme }) => theme.inputBackground};

    width: 100%;
    height: 190px;
    resize: none;
    border-radius: 0.375rem;

    border: solid 1px
      ${(prop) => (prop.hasError ? '#952c2c' : prop.theme.lines)};
    padding-left: 5px;
    padding-top: 5px;
    color: ${({ theme }) => theme.inputTextColor};
  }
`;
export const ModalActions = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  column-gap: 1.25rem;
  padding-bottom: 1.5rem;

  .cancel-button,
  .confirm-button {
    width: 160px;
    height: 43px;
    border-radius: 83px;
    border: none;
  }

  .cancel-button {
    background-color: #d0d0d0;
    font-weight: bold;
    color: #000000;
  }
  .confirm-button {
    background-color: #0caacd;
    color: #ffffff;
  }
`;
export const InputFile = styled.input``;

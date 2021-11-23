import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  height: 23vh;

  .warning-icon {
    width: 25.5rem;
    height: 8.25rem;
    margin-bottom: 1.25rem;
    fill: var(--orange);
  }
  h2 {
    margin-bottom: 1.4rem;
    font-weight: 300;
  }
  .modal-actions {
    display: flex;
    column-gap: 20px;

    .cancel-button,
    .confirm-button {
      width: 8rem;
      height: 2.5rem;
      border-radius: 1.375rem;
    }

    .cancel-button {
      background: transparent;
      border: solid 1px var(--blue);
    }
    .confirm-button {
      border: none;
      background: var(--blue);
      color: #ffffff;
    }
  }
`;

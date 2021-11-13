import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

export const ModalHeader = styled.header`
  width: 100%;
  h1 {
    padding-left: 20px;
    padding-bottom: 40px;
    padding-top: 10px;
  }
`;
export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  row-gap: 25px;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 10px;

    width: calc(100% - 50px);
    .pic-and-name {
      display: flex;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 15px;
      }
      .name {
        font-family: var(--roboto-font-family);
        color: #000000;
        font-size: 1rem;
      }
    }
    button {
      width: 6.5rem;
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
  }
`;

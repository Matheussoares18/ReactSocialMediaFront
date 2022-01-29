import styled from 'styled-components';

export const Container = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  /* &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  } */

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.menuHoverColor};
  }

  .content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: calc(100% - 60px);
    column-gap: 10px;
    margin-top: 1rem;
    margin-bottom: 1rem;
    .icon {
      width: 32px;
      height: 32px;
      fill: #ffffff;
      stroke: ${({ theme }) => theme.primaryText};
    }

    span {
      text-align: center;
      font-weight: 700;
      color: ${({ theme }) => theme.primaryText};
    }
  }
`;

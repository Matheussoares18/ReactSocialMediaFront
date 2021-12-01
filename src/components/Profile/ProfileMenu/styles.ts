import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.lines};

  margin-top: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 24px;

  .menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    column-gap: 8px;
    color: #7a7a7a;
    min-width: 8rem;
    padding-top: 1rem;

    .icon {
      width: 26px;
      height: 26px;
    }
  }
  .menu-item-active {
    display: flex;
    align-items: center;
    justify-content: center;

    text-decoration: none;
    column-gap: 8px;

    color: #0caacd;
    min-width: 8rem;
    border-top: solid 1px #0caacd;

    padding-top: 1rem;

    .icon {
      width: 26px;
      height: 26px;

      fill: #0caacd;
    }
  }
`;

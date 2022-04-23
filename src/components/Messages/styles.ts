import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  height: calc(100% - 3.5rem);
  display: flex;
  flex-direction: row;
`;

export const MessagesList = styled.div`
  flex: 1.5;
  max-width: 50rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: solid 1px ${({ theme }) => theme.lines};
  overflow: auto;
`;

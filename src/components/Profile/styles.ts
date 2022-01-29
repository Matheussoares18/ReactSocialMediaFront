import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 75rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-left: solid 1px ${({ theme }) => theme.lines};
  border-right: solid 1px ${({ theme }) => theme.lines};
  padding-top: 4.2rem;
`;

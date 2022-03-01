import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding-top: 3.75rem;
  margin-top: 3.75rem;
  border-top: solid 1px ${({ theme }) => theme.lines};
`;

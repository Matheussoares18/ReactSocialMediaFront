import styled from 'styled-components';

export const PostCommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  justify-content: flex-start;
  row-gap: 25px;
  max-height: calc(100vh - 30vh);

  overflow: auto;
`;

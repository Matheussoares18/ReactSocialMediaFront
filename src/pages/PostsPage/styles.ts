import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: flex-start;
`;
export const PostsList = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .loading {
    background-color: transparent;
    width: 85%;
    max-width: 43.75rem;
    margin-bottom: 1.25rem;
  }
`;
export const SpinnerContainer = styled.div`
  width: 100%;

  display: flex;

  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

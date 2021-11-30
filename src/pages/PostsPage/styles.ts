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
export const LoadingPostsError = styled.div`
  border: 1px solid ${({ theme }) => theme.lines};

  box-shadow: 0px 4px 4px rgba(90, 87, 87, 0.25);
  border-radius: 4px;

  width: 85%;
  max-width: 43.75rem;
  height: 5.625rem;

  display: flex;
  justify-content: center;
  align-items: center;

  .text-and-emote {
    width: calc(100% - 32px);
    display: flex;
    column-gap: 1.5rem;
    align-items: center;
    .emote {
      width: 94px;
      height: 55px;
    }
    p {
      font-weight: 300;
    }
  }
`;

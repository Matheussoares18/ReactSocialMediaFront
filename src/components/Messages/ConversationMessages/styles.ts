import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 3rem);
  height: calc(100% - 3rem);
  row-gap: 2rem;
`;
interface MessageProps {
  isSequence?: boolean;
}
export const IncomingMessage = styled.div<MessageProps>`
  width: 100%;
  height: max-content;
  display: flex;
  column-gap: 1rem;
  margin-top: ${({ isSequence }) => (isSequence ? '-2.8rem' : '0rem')};

  .profile-picture {
    border-radius: 50%;
    width: 1.8rem;
    height: 1.8rem;
    visibility: ${({ isSequence }) => (isSequence ? 'hidden' : 'visible')};
  }
  .user-infos-and-message {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 0.6rem;
    .username {
      color: ${({ theme }) => theme.primaryText};
      font-size: 0.8rem;
      visibility: ${({ isSequence }) => (isSequence ? 'hidden' : 'visible')};
    }
    p {
      background: transparent;
      border: solid 1px ${({ theme }) => theme.lines};
      padding: 1rem;
      line-height: 1.2rem;
      color: ${({ theme }) => theme.labelText};
      font-size: 0.8rem;
      word-break: break-all;
      max-width: 22rem;
      border-radius: ${({ isSequence }) =>
        isSequence ? '1rem' : '0rem 1rem 1rem 1rem'};
    }
  }
`;
interface OutcommingMessageProps {
  isSequence?: boolean;
}
export const OutcommingMessage = styled.div<OutcommingMessageProps>`
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: flex-end;
  column-gap: 1rem;
  margin-top: ${({ isSequence }) => (isSequence ? '-2.8rem' : '0rem')};

  .profile-picture {
    border-radius: 50%;
    width: 1.8rem;
    height: 1.8rem;
    visibility: ${({ isSequence }) => (isSequence ? 'hidden' : 'visible')};
  }
  .user-infos-and-message {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    row-gap: 0.6rem;
    .username {
      color: ${({ theme }) => theme.primaryText};
      font-size: 0.8rem;
      visibility: ${({ isSequence }) => (isSequence ? 'hidden' : 'visible')};
    }
    p {
      background: ${({ theme }) => theme.buttonsBackground};
      padding: 1rem;
      line-height: 1.2rem;
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.8rem;
      word-break: break-all;
      max-width: 22rem;
      border-radius: ${({ isSequence }) =>
        isSequence ? '1rem' : '1rem 0rem 1rem 1rem'};
    }
  }
`;

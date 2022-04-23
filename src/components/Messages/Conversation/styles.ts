import styled from 'styled-components';
import { colors } from 'styles/colors';

export const Container = styled.div`
  flex: 5;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ConversationHeader = styled.div`
  width: 100%;
  height: 6rem;
  border-bottom: 1px solid ${({ theme }) => theme.lines};
  display: flex;
  align-items: center;
  justify-content: center;
  .top-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 4rem);
    .user-infos {
      display: flex;
      column-gap: 1rem;
      align-items: center;
      .profile-picture {
        border-radius: 50%;
        width: 3.125rem;
        height: 3.125rem;
      }
      p {
        color: ${({ theme }) => theme.primaryText};
      }
    }

    .more-icon {
      &:hover {
        cursor: pointer;
      }
      fill: ${colors.gray_800};
    }
  }
`;

export const ConversationBottom = styled.div`
  width: 100%;
  height: 4.5rem;
  border-top: 1px solid ${({ theme }) => theme.lines};
  display: flex;
  justify-content: center;

  .conversation-container {
    display: flex;
    align-items: center;
    width: calc(100% - 4rem);
    column-gap: 1rem;
    .message {
      flex: 1;
      color: ${({ theme }) => theme.inputTextColor};
      background: ${({ theme }) => theme.inputBackground};
      border: none;
      font-size: 1rem;
      font-style: italic;
      resize: none;
      &:active {
        outline: none;
      }
    }
    .clip-button {
      background: transparent;
      border: none;
      .icon {
        width: 1.8rem;
        height: 1.8rem;
        fill: ${({ theme }) => theme.iconsColor};
      }
    }
    .send-button {
      background: ${({ theme }) => theme.buttonsBackground};
      border: none;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon {
        width: 1.4rem;
        height: 1.4rem;
        fill: ${colors.white};
      }
    }
  }
`;

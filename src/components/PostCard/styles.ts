import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.lines};

  box-shadow: 0px 4px 4px rgba(90, 87, 87, 0.25);
  border-radius: 4px;

  width: 85%;
  max-width: 43.75rem;
  margin-bottom: 35px;
  padding-bottom: 25px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .top {
    display: flex;
    width: calc(100% - 2.25rem);

    padding-top: 0.875rem;
    justify-content: space-between;

    border-bottom: 0.063rem solid ${({ theme }) => theme.lines};
    padding-bottom: 0.625rem;

    margin-bottom: 0.938rem;

    .user-and-post-infos {
      display: flex;
      align-items: center;
      img {
        width: 2.625rem;
        height: 2.625rem;
        border-radius: 4.063rem;
        margin-right: 0.625rem;
      }
      .name {
        font-family: var(--roboto-font-family);
        color: ${({ theme }) => theme.primaryText};
        font-size: 0.813rem;
        border-right: 1px solid ${({ theme }) => theme.lines};
        padding-right: 15px;
        margin-right: 15px;
      }

      time {
        font-size: 0.875rem;
        font-family: var(--roboto-font-family);
        font-weight: 400;
        color: #7a7a7a;
      }
    }
    .more-icon {
      fill: #8e9090;

      &:hover {
        cursor: pointer;
      }
    }
  }
  .image-container {
    width: 100%;

    margin-bottom: 1.563rem;
    position: relative;

    .arrow-background {
      position: absolute;
      bottom: 50%;

      width: 2.313rem;
      height: 2.313rem;
      background: rgba(233, 233, 233, 0.6);
      border-radius: 50%;

      display: flex;
      justify-content: center;
      align-items: center;

      background: transparent;
      border: none;

      &:hover {
        cursor: pointer;
      }

      .arrow-icon {
        fill: #ffffff;
      }
    }
    .left {
      left: 2%;
      transform: rotate(180deg);
    }
    .right {
      right: 2%;
    }

    .post-image {
      width: 100%;
      max-height: 31.25rem;

      object-fit: cover;
      object-position: end;
    }
  }
  .likes-and-actions {
    width: calc(100% - 2.25rem);
    display: flex;
    justify-content: space-between;
    padding-bottom: 1.25rem;
    margin-bottom: 0.938rem;
    border-bottom: 0.063rem solid ${({ theme }) => theme.lines};

    .likes {
      display: flex;
      align-items: center;
      border: none;
      background: color;

      &:hover {
        cursor: pointer;
      }
      img {
        width: 1.5rem;
        height: 1.438rem;
        border-radius: 4.063rem;
        margin-right: 0.438rem;
      }
      span {
        font-family: var(--roboto-font-family);
        color: #7a7a7a;
        font-size: 0.813rem;
        font-weight: 400;
      }
      .user-name {
        font-family: var(--roboto-font-family);
        color: ${({ theme }) => theme.primaryText};
        font-weight: bold;
        margin-left: 5px;
        margin-right: 5px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      column-gap: 2.75rem;

      .icon {
        fill: #0caacd;
        width: 2.25rem;
        height: 2.25rem;

        &:hover {
          cursor: pointer;
        }

        &:first-child {
          border: none;
        }
      }
      .liked {
        fill: rgba(255, 0, 0, 1);
      }

      .favorite-filled-animation {
        display: flex;
        animation: like 1s normal forwards;
        @keyframes like {
          25% {
            transform: rotate(120deg);
          }
          50% {
            fill: rgba(255, 0, 0, 0.5);
          }
          100% {
            transform: rotate(-360deg);
            fill: rgba(255, 0, 0, 1);
          }
        }
      }
    }
  }
  .post-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    justify-content: flex-start;
    row-gap: 0.313rem;
    width: calc(100% - 2.25rem);

    padding-bottom: 0.938rem;

    h3 {
      font-family: var(--roboto-font-family);
      font-weight: bold;
      font-size: 0.813rem;
      color: ${({ theme }) => theme.primaryText};
    }

    p {
      font-family: var(--roboto-font-family);
      font-weight: 400;
      font-size: 0.813rem;
      color: #7a7a7a;
      width: 100%;
      line-height: 0.938rem;
    }
  }
`;
export const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  row-gap: 15px;
  width: calc(100% - 2.25rem);
  padding-top: 1.5rem;

  .see-all-coments {
    border: none;
    background: transparent;
    color: #0caacd;
    text-decoration: underline;
  }
`;

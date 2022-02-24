import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.lines};
  box-shadow: 0px 4px 4px rgba(90, 87, 87, 0.25);
  border-radius: 4px;

  width: 85%;
  max-width: 43.75rem;
  min-height: 8rem;
  margin-top: 2.125rem;
  margin-bottom: 1.625rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  video {
    width: 200px;
    height: 200px;
  }

  .content {
    width: calc(100% - 2rem);
    height: calc(100% - 1.125rem);

    .top {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-bottom: 0.5rem;
      margin-bottom: 0.5rem;
      border-bottom: 1px solid ${({ theme }) => theme.lines};

      img {
        width: 2.25rem;
        height: 2.188rem;
        border-radius: 4.063rem;
        margin-right: 1.625rem;
      }
      textarea {
        width: 100%;
        border: none;
        resize: none;
        padding-top: 0.5rem;
        background: ${(prop) => prop.theme.inputBackground};
        color: ${({ theme }) => theme.inputTextColor};
        font-family: var(--roboto-font-family);
        font-weight: 200;
        font-style: italic;
        font-size: 1.4rem;
        &:placeholder {
          font-family: var(--roboto-font-family);
          font-weight: 200;
          font-style: italic;
          font-size: 1.125rem;
        }
        &:focus {
          outline: none;
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 0.5rem;
      .collections-icon {
        fill: #0caacd;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .preview-image-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    width: calc(100% - 2rem);

    padding-top: 0.938rem;
    padding-bottom: 0.938rem;
    column-gap: 10px;
    .preview-image {
      width: 50px;
      border-radius: 12px;
      height: 50px;
      object-fit: cover;
      object-position: center;
    }
  }
`;

enum UploadStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
interface ProgressButtonProps {
  status: UploadStatus;
  progress: number;
}
const progressBarStatusMap = {
  [UploadStatus.SUCCESS]: 'rgba(0, 255, 0, 0.5)',
  [UploadStatus.ERROR]: 'rgba(255,0,0, 0.5)',
  [UploadStatus.IDLE]: '#0caacd',
  [UploadStatus.LOADING]: 'rgba(0, 255, 0, 0.5)',
};
export const ProgressButton = styled.button<ProgressButtonProps>`
  background: #0caacd;
  border: none;
  height: 2.6rem;
  width: 6.5rem;
  font-family: var(--roboto-font-family);
  font-size: 0.813rem;
  font-weight: bold;
  color: #ffffff;
  border-radius: 0.2rem;
  position: relative;

  span {
    position: relative;
    z-index: 10;
  }

  .progress-bar {
    position: absolute;
    background: ${(prop) => progressBarStatusMap[prop.status]};
    width: ${(prop) => prop.progress}%;
    height: 100%;
    top: 0px;
    border-radius: 0.2rem;
    z-index: 2;
  }
`;

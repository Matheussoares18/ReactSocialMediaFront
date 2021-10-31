import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid #eadede;
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

  .content {
    width: calc(100% - 2rem);
    height: calc(100% - 1.125rem);

    .top {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-bottom: 0.5rem;
      margin-bottom: 0.5rem;
      border-bottom: 1px solid #e1e2e2;

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
      .collections-icon {
        fill: #0caacd;

        &:hover {
          cursor: pointer;
        }
      }
      button {
        width: 6.5rem;
        height: 2.063rem;
        background: #0caacd;

        border-radius: 1.063rem;
        border: none;

        font-family: var(--roboto-font-family);
        font-size: 0.813rem;
        font-weight: bold;
        color: #ffffff;

        &:hover {
          filter: brightness(0.8);
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

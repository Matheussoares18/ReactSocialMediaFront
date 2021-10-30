import styled from 'styled-components';

interface SelectContainerProps {
  hasError?: boolean;
}
interface ContainerProps {
  maxWidth?: string;
  hasError?: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-width: ${(prop) => prop.maxWidth};

  label {
    font-family: var(--roboto-font-family);
    font-weight: 400;
    font-size: 0.875rem;
    color: ${(prop) => (prop.hasError ? '#F02626' : '#929292')};
    margin-bottom: 0.313rem;
  }
  .error-message-container {
    position: relative;
    width: 100%;
    padding-top: 5px;
    span {
      position: absolute;
      font-family: var(--roboto-font-family);
      color: #f02626;
      font-size: 0.75rem;
    }
  }

  &:hover {
    cursor: pointer;
  }
`;

export const SelectContainer = styled.div<SelectContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  width: 100%;
  border: solid 1px ${(prop) => (prop.hasError ? '#F02626' : '#cecece')};
  height: 2.5rem;
  border-radius: 0.375rem;

  input {
    background: transparent;
    border: none;
    width: 100%;
    color: #7d7c7c;
    &:focus {
      outline: none;
    }
    &:hover {
      cursor: pointer;
    }
  }

  span {
    color: #7d7c7c;
  }
  .expand-more {
    width: 24px;
    height: 24px;
    fill: #929292;
  }
`;

export const ItemsList = styled.div`
  position: relative;
  width: 100%;
  left: 5px;
  .content {
    position: absolute;
    width: 100%;
    z-index: 5;

    margin-top: 10px;
    padding-top: 10px;

    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(1, 1, 1, 0.25);

    display: flex;
    flex-direction: column;

    align-items: flex-start;
    justify-content: flex-start;
  }
`;
export const Item = styled.div`
  width: 100%;
  height: 30px;

  display: flex;

  justify-content: flex-start;
  align-items: center;

  &:hover {
    background: #e3e3e3;
  }

  span {
    padding-left: 15px;
    font-family: var(--roboto-font-family);
    font-weight: 400;

    font-size: 0.875rem;
    color: #929292;
  }
  & + & {
    border-top: solid 1px #cecece;
  }
`;

export const SelectDimmer = styled.div`
  position: absolute;
  width: 100%;

  height: 100%;
  top: 0px;

  left: 0px;
  z-index: 1;
`;

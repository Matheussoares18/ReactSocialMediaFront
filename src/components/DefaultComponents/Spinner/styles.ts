import styled from 'styled-components';

export const SpinnerItem = styled.div`
  border: 2px solid #0caacd;
  border-top-color: ${({ theme }) => theme.primaryText};
  border-radius: 50%;
  height: 18px;
  width: 18px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

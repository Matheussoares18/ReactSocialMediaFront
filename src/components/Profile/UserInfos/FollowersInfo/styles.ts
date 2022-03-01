import { colors } from 'styles/colors';
import styled from 'styled-components';

export const Container = styled.p`
  display: flex;
  column-gap: 0.375rem;
  font-weight: 300;

  .value {
    color: ${colors.mainBlue};
  }
  .label {
    color: ${({ theme }) => theme.labelText};
    font-weight: 400;
  }
`;

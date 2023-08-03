import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.accept3};
  letter-spacing: 0.04rem;
`;
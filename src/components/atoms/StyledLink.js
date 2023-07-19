import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  font-family: "Roboto Slab", monospace;
  color: ${({theme}) => theme.colors.accept3};
  font-size: 1rem;
  letter-spacing: 0.04rem;
`;
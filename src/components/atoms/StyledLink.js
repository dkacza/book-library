import styled from 'styled-components';
import {Link} from 'react-router-dom';

const StyledLink = styled(Link)`
  font-size: 1.2rem;
  border: none;
  background: none;
  text-decoration: underline;
  cursor: pointer;
  color: ${({theme}) => theme.colors.accept3};
`;
export default StyledLink;

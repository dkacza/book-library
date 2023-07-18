import styled from 'styled-components';
import Title from 'components/atoms/Title';
import { Link } from 'react-router-dom';
import LanguageButton from 'components/atoms/LanguageButton';

export const StyledLink = styled(Link)`
  font-family: 'Roboto Slab', monospace;
  color: ${({theme}) => theme.colors.accept3};
  letter-spacing: 0.04rem;
`;
export const PositionedLanguageButton = styled(LanguageButton)`
  margin-top: auto;
  align-self: flex-end;
`;

export const Wrapper = styled.main`
  padding: 5rem;
  display: flex;
  flex-direction: column;
  
  ${Title} {
    margin-bottom: 5rem;
  }
  p {
    font-family: 'Roboto Slab', monospace;
  }
`;

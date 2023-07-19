import styled from 'styled-components';
import Title from 'components/atoms/Title';
import LanguageButton from 'components/atoms/LanguageButton';

export const PositionedLanguageButton = styled(LanguageButton)`
  margin-top: auto;
  align-self: flex-end;
`;

export const Wrapper = styled.main`
  padding: 5rem;
  display: flex;
  flex-direction: column;

  @media(max-width: 1280px) {
    padding: 3rem;
  }
  
  ${Title} {
    max-width: calc(100% - 5rem);
  }
  p {
    font-family: 'Roboto Slab', monospace;
  }
`;

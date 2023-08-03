import styled from 'styled-components';
import Title from 'components/atoms/Title';

export const Wrapper = styled.main`
  padding: 5rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 1280px) {
    padding: 3rem;
  }

  ${Title} {
    max-width: calc(100% - 5rem);
  }

  p {
    font-family: 'Roboto Slab', monospace;
  }
`;

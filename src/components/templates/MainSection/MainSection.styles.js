import styled from 'styled-components';
import Title from 'components/atoms/Title';

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  ${Title} {
    margin-bottom: 2rem;
    font-size: 3.5rem;
  }
  div {
    flex-grow: 1;
  }
  padding: 3rem;
`
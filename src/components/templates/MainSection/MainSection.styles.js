import styled from 'styled-components';
import Title from 'components/atoms/Title';

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  padding: 3rem;
  ${Title} {
    margin-bottom: 2rem;
    font-size: 3.5rem;
  }
  & > div {
    flex-grow: 1;
    overflow: hidden;
  }
  @media(max-width: 1300px) {
    padding: 2rem;
  }
  
`
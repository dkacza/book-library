import styled from 'styled-components';
import Title from 'components/atoms/Title';

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  ${Title} {
    margin-bottom: 2rem;
  }
  padding: 3rem;
`
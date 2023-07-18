import styled from 'styled-components';
import Title from 'components/atoms/Title';

export const Wrapper = styled.main`
  padding: 5rem;
  display: flex;
  flex-direction: column;
  
  ${Title} {
    margin-bottom: 5rem;
  }
`;

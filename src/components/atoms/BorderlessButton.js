import styled from 'styled-components';

const BorderlessButton = styled.button`
  font-family: 'Roboto Slab', monospace;
  font-size: 1.2rem;
  border: none;
  background: none;
  color: ${({theme}) => theme.colors.accept3};
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;
export default BorderlessButton;
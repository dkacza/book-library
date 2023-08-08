import styled from 'styled-components';

const SimpleInput = styled.input`
  background: none;
  border: none;
  border-bottom: 3px solid ${({theme}) => theme.colors.primary3};
  padding-bottom: 0.25rem;
  
  &::-webkit-input-placeholder  {
    color: ${({theme}) => theme.colors.secondary1};
  }
  
  &:focus-visible {
    outline: none;
  }
`;

export default SimpleInput;
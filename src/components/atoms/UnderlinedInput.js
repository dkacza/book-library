import styled from 'styled-components';

const UnderlinedInput = styled.input`
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-background-clip: text;
  }

  padding-bottom: 0.25rem;
  height: 100%;
  background: none;

  border: none;
  border-bottom: 0.2rem solid ${({theme}) => theme.colors.primary3};

  &::-webkit-input-placeholder {
    color: ${({theme}) => theme.colors.secondary1};
  }

  &:focus-visible {
    outline: none;
  }

  &.error {
    color: ${({theme}) => theme.colors.error2};
    border-bottom: 0.2rem solid ${({theme}) => theme.colors.error2};
  }
`;

export default UnderlinedInput;

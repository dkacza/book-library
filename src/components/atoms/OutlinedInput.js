import styled from 'styled-components';

const OutlinedInput = styled.input`
  border: 0.15rem solid ${({ theme }) => theme.colors.primary3};
  border-bottom: 0.20rem solid ${({ theme }) => theme.colors.primary3};
  border-radius: 0.25rem;
  padding: 0.5rem 0.5rem;
  font-size: 1rem;
  max-width: 10rem;
  
  outline: none;
  background-color: ${({ theme }) => theme.colors.primary1};
  color: ${({ theme }) => theme.colors.secondary2};

  &.error {
    border: 0.15rem solid ${({ theme }) => theme.colors.error2};
    border-bottom: 0.20rem solid ${({ theme }) => theme.colors.error2};
    color: ${({ theme }) => theme.colors.error2};
  }
`;

export default OutlinedInput;

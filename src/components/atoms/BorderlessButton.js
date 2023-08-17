import styled from 'styled-components';

const BorderlessButton = styled.button`
  font-size: 1.2rem;
  border: none;
  background: none;
  text-decoration: underline;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.accept3};
`;
export default BorderlessButton;
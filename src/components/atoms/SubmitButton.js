import styled from 'styled-components';

const SubmitButton = styled.button`
  height: 3.5rem;
  border: 0.2rem solid ${({ theme }) => theme.colors.accept2};
  border-bottom: 0.4rem solid ${({ theme }) => theme.colors.accept2};
  border-radius: 0.35rem;
  background-color: ${({ theme }) => theme.colors.accept1};
  color: ${({ theme }) => theme.colors.secondary2};
  text-align: center;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.06rem;
  box-shadow: 0 0 0.25rem 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

export default SubmitButton;
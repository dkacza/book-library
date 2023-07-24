import styled from 'styled-components';

const SubmitButton = styled.button`
  height: 3.5rem;
  border-radius: 0.5rem;
  border: 3px solid ${({theme}) => theme.colors.accept2};
  border-bottom: 6px solid ${({theme}) => theme.colors.accept2};
  background-color: ${({theme}) => theme.colors.accept1};
  color: ${({theme}) => theme.colors.secondary2};
  text-align: center;
  font-family: 'Roboto Slab', serif;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.06rem;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  
  &:hover {
    cursor: pointer;
  }
`;

export default SubmitButton;
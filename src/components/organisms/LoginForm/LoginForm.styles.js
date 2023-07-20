import styled from 'styled-components';

export const StyledForm = styled.form`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  .icon-input {
    margin-bottom: 2.5rem;
  }
  
  .icon-input:nth-child(2) {
    margin-bottom: 1rem;
  }
  
  .submit-button {
    margin-top: 3rem;
  }
  p.error-message {
    color: ${({theme}) => theme.colors.error1};
    font-weight: bold;
    font-size: 1.25rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;
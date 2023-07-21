import styled from 'styled-components';

const StyledForm = styled.form`
  margin-top: 3rem;
  .icon-input {
    height: 3rem;
    margin-bottom: 1.5rem;
  }
  .icon-input:nth-last-child(1) {
    margin-bottom: 0.5rem;
  }
  .submit-button {
    width: 100%;
    margin: 1rem 0;
  }
  p {
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }
  input#agreement {
    height: 24px;
    width: 24px;
  }
  p.error-message {
    color: #F26C6C;
    font-weight: bold;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  
  
  @media(max-width: 1300px) {
    margin-top: 2rem;
    .icon-input {
      margin-bottom: 0.5rem;
      input {
        font-size: 1rem;
      }
    }
    .submit-button {
      width: 100%;
      height: 2.5rem;
      font-size: 1rem;
      margin: 2rem 0;
    }
  }
`;
export default StyledForm;
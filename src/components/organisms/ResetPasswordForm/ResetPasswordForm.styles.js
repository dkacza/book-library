import styled from 'styled-components';

const StyledForm = styled.form`
  margin-top: 5rem;
  .icon-button {
    height: 3rem;
    margin-bottom: 1.5rem;
  }
  .submit-button {
    width: 100%;
    margin: 2.5rem 0;
  }
  input#agreement {
    height: 24px;
    width: 24px;
  }
  
  @media(max-width: 1300px) {
    margin-top: 2rem;
    .icon-button {
      margin-bottom: 0.5rem;
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
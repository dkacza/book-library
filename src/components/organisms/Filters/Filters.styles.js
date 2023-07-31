import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding-left: 1.5rem;

  .icon-input {
    height: 3.5rem;
    margin-bottom: 1rem;
    width: 80%;
  }

  .release-year-filter {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    
    .release-year-input {
      margin-top: 0.25rem;
      display: flex;
      flex-direction: row;
      height: 2rem;
      font-size: 1.5rem;
    }
  }
  
  .genre-filter {
    p {
      margin-bottom: 0.25rem;
    }
    margin-bottom: 1rem;
  }
  .availability-filter {
    p {
      margin-bottom: 0.25rem;
    }
    margin-bottom: 1rem;
  }

  p {
    font-family: 'Roboto Slab', monospace;
  }
  
  button {
    margin-top: 2rem;
    width: 50%;
    height: 3rem;
    font-size: 1.25rem;
  }

`;

export default StyledForm;
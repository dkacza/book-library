import styled from 'styled-components';
import SimpleInput from 'components/atoms/SimpleInput';

const StyledAddBookForm = styled.form`
  & > div {
    margin-bottom: 1.25rem;
    .label {
      font-weight: bold;
      font-size: 1.5rem;
      color: ${({ theme }) => theme.colors.secondary1};
      margin-bottom: 0.25rem;
    }
    
    ${SimpleInput} {
      font-size: 1.25rem;
    }
    .hint {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.colors.secondary1};
    }
  }

  

`;
export default StyledAddBookForm;
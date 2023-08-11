import styled from 'styled-components';
import SimpleInput from 'components/atoms/SimpleInput';
import TextArea from 'components/atoms/TextArea';

const StyledBookTextData = styled.div`
  &>div {
    margin-bottom: 1rem;
  }
  .label {
    font-weight: bold;
    font-size: 1.75rem;
    color: ${({theme}) => theme.colors.secondary1};
  }
  .data {
    font-size: 1.5rem;
  }
  
  ${SimpleInput} {
    font-size: 1.5rem;
  }
  ${TextArea} {
    font-size: 1rem;
  }
  
  @media(max-width: 1300px) {
    &>div {
      margin-bottom: 0.25rem;
    }
    .label {
      font-size: 1.25rem;
    }
    .data {
      font-size: 1rem;
    }
    ${SimpleInput} {
      font-size: 1rem;
    }
    ${TextArea} {
      font-size: 0.75rem;
    }
  }
  
`;
export default StyledBookTextData;
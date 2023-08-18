import styled from 'styled-components';
import UnderlinedInput from 'components/atoms/UnderlinedInput';
import TextArea from 'components/atoms/TextArea';

const StyledBookTextData = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  overflow: hidden;

  .label {
    font-weight: bold;
    font-size: 1.75rem;
    color: ${({ theme }) => theme.colors.secondary1};
  }

  .data {
    font-size: 1.5rem;
  }
  
  & > div {
    margin-bottom: 1rem;
  }
  
  ${TextArea} {
    width: 28rem;
    min-height: 10rem;
    height: max-content;
  }
  
  ${UnderlinedInput} {
    font-size: 1.25rem;
    height: max-content;
  }

  ${TextArea} {
    font-size: 1rem;
  }
  .available {
    color: ${({theme}) => theme.colors.accept3};
  }
  .borrowed {
     color: ${({theme}) => theme.colors.error2};
   }
  

  @media (max-width: 1300px) {
    & > div {
      margin-bottom: 0.25rem;
    }

    .label {
      font-size: 1.25rem;
    }

    .data {
      font-size: 1rem;
    }

    ${UnderlinedInput} {
      font-size: 1rem;
    }

    ${TextArea} {
      font-size: 0.75rem;
    }
  }

`;
export default StyledBookTextData;
import styled from 'styled-components';
import UserDataLine from 'components/organisms/UserDataLine';
import BorderlessButton from 'components/atoms/BorderlessButton';
import UnderlinedInput from 'components/atoms/UnderlinedInput';

const StyledPersonalData = styled.div`
  margin-top: 3rem;
  ${UserDataLine} {
    margin-bottom: 1.5rem;
    max-height: 2rem;
    ${UnderlinedInput} {
      width: 22rem;
      margin-right: 2rem;
    }
  }
  ${BorderlessButton} {
    font-size: 1.5rem;
    margin-right: 2rem;
  }
  ${BorderlessButton}.discard {
    color: ${({theme}) => theme.colors.primary3};
  }
  p.error-msg {
    font-size: 1rem;
    color: ${({theme}) => theme.colors.error2};
    margin-bottom: 1rem;
  }
  p.success-msg {
    font-size: 1rem;
    color: ${({theme}) => theme.colors.accept3};
    margin-bottom: 1rem;
  }
  @media(max-width: 1600px) {
    ${UserDataLine} {
      font-size: 1.5rem;
      p:nth-child(1) {
        width: 18rem;
      }
      ${UnderlinedInput} {
        font-size: 1.5rem;
      }
    }
    ${BorderlessButton} {
      font-size: 1.25rem;
    }
  }
  @media(max-width: 1300px) {
    margin-top: 0;
    ${UserDataLine} {
      font-size: 1.25rem;
      margin-bottom: 0.75rem;
      ${UnderlinedInput} {
        font-size: 1.25rem;
      }
    }
    
  }
`;
export default StyledPersonalData;
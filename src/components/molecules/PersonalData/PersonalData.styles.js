import styled from 'styled-components';
import UserDataLine from 'components/molecules/UserDataLine';
import BorderlessButton from 'components/atoms/BorderlessButton';
import SimpleInput from 'components/atoms/SimpleInput';

const StyledPersonalData = styled.div`
  margin-top: 3rem;
  ${UserDataLine} {
    margin-bottom: 1.5rem;
    max-height: 2rem;
    ${SimpleInput} {
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
    color: ${({theme}) => theme.colors.error2};
    margin-bottom: 1rem;
  }
  @media(max-width: 1440px) {
    ${UserDataLine} {
      font-size: 1.5rem;
      p:nth-child(1) {
        width: 18rem;
      }
    }
    ${BorderlessButton} {
      font-size: 1.25rem;
    }
  }
  @media(max-width: 1300px) {
    ${SimpleInput} {
      font-size: 1.5rem;
    }
  }
`;
export default StyledPersonalData;
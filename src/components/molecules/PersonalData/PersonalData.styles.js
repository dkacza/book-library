import styled from 'styled-components';
import UserDataLine from 'components/atoms/UserDataLine';
import BorderlessButton from 'components/atoms/BorderlessButton';

const StyledPersonalData = styled.div`
  margin-top: 3rem;
  ${UserDataLine} {
    margin-bottom: 1.5rem;
  }
  ${BorderlessButton} {
    font-size: 1.5rem;
    margin-right: 2rem;
  }
  ${BorderlessButton}.discard {
    color: ${({theme}) => theme.colors.primary3};
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
`;
export default StyledPersonalData;
import styled from 'styled-components';
import UserDataLine from 'components/molecules/UserDataLine';
import BorderlessButton from 'components/atoms/BorderlessButton';

const StyledAuthorizationData = styled.div`
  margin-top: 3rem;

  ${UserDataLine} {
    margin-bottom: 1.5rem;
  }

  ${BorderlessButton} {
    font-size: 1.5rem;
  }

  @media (max-width: 1440px) {
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
export default StyledAuthorizationData;

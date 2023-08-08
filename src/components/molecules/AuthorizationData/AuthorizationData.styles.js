import styled from 'styled-components';
import UserDataLine from 'components/molecules/UserDataLine';
import BorderlessButton from 'components/atoms/BorderlessButton';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';

const StyledAuthorizationData = styled.div`
  margin-top: 3rem;

  ${UserDataLine} {
    margin-bottom: 1.5rem;
  }

  ${BorderlessButton} {
    font-size: 1.5rem;
    margin-right: 2rem;
  }

  ${BorderlessButton}.discard {
    color: ${({ theme }) => theme.colors.primary3}
  }

  ${InputWithIcon} {
    height: 3rem;
    border-radius: 0.4rem;
    max-width: 32rem;
    margin-bottom: 1rem;
  }

  p.password-info {
    margin-bottom: 1rem;
  }

  p.error-msg {
    color: ${({theme}) => theme.colors.error2};
    margin-bottom: 1rem;
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

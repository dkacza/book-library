import styled from 'styled-components';
import UserDataLine from 'components/organisms/UserDataLine';
import BorderlessButton from 'components/atoms/BorderlessButton';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';

const StyledAuthorizationData = styled.div`
  margin-top: 1.5rem;

  ${UserDataLine} {
    margin-bottom: 1.25rem;
  }

  ${BorderlessButton} {
    font-size: 1.25rem;
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
    font-size: 1rem;
  }
  p.error-msg {
    color: ${({theme}) => theme.colors.error2};
    margin-bottom: 1rem;
    font-size: 1rem;
  }
  p.success-msg {
    color: ${({theme}) => theme.colors.accept3};
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  @media (max-width: 1600px) {
    margin-top: 1.5rem;
    ${UserDataLine} {
      font-size: 1.5rem;

      p:nth-child(1) {
        width: 18rem;
      }
    }
    ${BorderlessButton} {
      font-size: 1.25rem;
    }
    ${InputWithIcon} {
      height: 2.5rem;
      border-radius: 0.25rem;
      input {
        font-size: 1rem;
      }
    }
    p.password-info, p.error-msg, p.success-msg {
      margin-bottom: 0.5rem;
    }
  }
  @media(max-width: 1300px) {
    ${UserDataLine} {
      font-size: 1.25rem;
      margin-bottom: 0.75rem;
    }
  }
`;
export default StyledAuthorizationData;

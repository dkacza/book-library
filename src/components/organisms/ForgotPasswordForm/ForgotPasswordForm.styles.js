import styled from 'styled-components';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import SubmitButton from 'components/atoms/SubmitButton';

const StyledForgotPasswordForm = styled.form`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;

  p.instruction {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    color: ${({theme}) => theme.colors.secondary1};
  }

  ${InputWithIcon} {
    margin-bottom: 2.5rem;
  }
  div.submit-container {
    height: 4rem;
    margin-bottom: 5rem;
    ${SubmitButton} {
      width: 100%;
    }
  }
  div.resend {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      color: ${({theme}) => theme.colors.secondary1};
      font-size: 1.25rem;
    }
  }
`;

export default StyledForgotPasswordForm;

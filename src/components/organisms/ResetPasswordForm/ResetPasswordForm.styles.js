import styled from 'styled-components';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import SubmitButton from 'components/atoms/SubmitButton';

const StyledResetPasswordForm = styled.form`
  margin-top: 5rem;
  ${InputWithIcon} {
    margin-bottom: 1.5rem;
  }

  ${SubmitButton} {
    width: 100%;
    margin: 2.5rem 0;
  }
  div.error-container {
    height: 2rem;
    margin-top: 2rem;
  }
  p.error-msg {
    font-weight: bold;
    font-size: 1.25rem;
    color: ${({theme}) => theme.colors.error1};
  }
  p.success-msg {
    font-weight: bold;
    font-size: 1.25rem;
    color: ${({theme}) => theme.colors.accept3};
    margin-bottom: 5rem;
  }
`;
export default StyledResetPasswordForm;

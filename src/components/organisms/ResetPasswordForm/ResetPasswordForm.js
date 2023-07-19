import React from 'react';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';

import {ReactComponent as PasswordIcon} from 'assets/icons/lock_FILL0_wght600_GRAD0_opsz48.svg';
import {ReactComponent as PasswordConfirmIcon} from 'assets/icons/task_alt_FILL0_wght600_GRAD0_opsz48.svg';
import SubmitButton from 'components/atoms/SubmitButton';
import StyledForm from 'components/organisms/ResetPasswordForm/ResetPasswordForm.styles';

const ResetPasswordForm = () => {
  return (
    <StyledForm>

      <InputWithIcon type={'password'} id={'password'} name={'new password'} Icon={PasswordIcon}></InputWithIcon>
      <InputWithIcon type={'password'} id={'password-confirm'} name={'confirm new password'} Icon={PasswordConfirmIcon}></InputWithIcon>

      <SubmitButton className="submit-button">Reset password</SubmitButton>
    </StyledForm>
  );
}
export default ResetPasswordForm;
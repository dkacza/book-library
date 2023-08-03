import React from 'react';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import { ReactComponent as PasswordIcon } from 'assets/icons/lock_FILL0_wght600_GRAD0_opsz48.svg';
import { ReactComponent as PasswordConfirmIcon } from 'assets/icons/task_alt_FILL0_wght600_GRAD0_opsz48.svg';
import SubmitButton from 'components/atoms/SubmitButton';
import StyledResetPassword from 'components/organisms/ResetPasswordForm/ResetPasswordForm.styles';
import styled from 'styled-components';

const ResetPasswordForm = () => {
  return (
    <StyledResetPassword>
      <InputWithIcon
        type={'password'}
        id={'password'}
        placeholder={'new password'}
        name={'new password'}
        Icon={PasswordIcon}
      />
      <InputWithIcon
        type={'password'}
        id={'password-confirm'}
        placeholder={'confirm new password'}
        name={'confirm new password'}
        Icon={PasswordConfirmIcon}
      />

      <SubmitButton className="submit-button">Reset password</SubmitButton>
    </StyledResetPassword>
  );
};
export default styled(ResetPasswordForm)``;

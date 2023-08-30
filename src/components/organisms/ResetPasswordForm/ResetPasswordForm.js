import React from 'react';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import {ReactComponent as PasswordIcon} from 'assets/icons/lock_FILL0_wght600_GRAD0_opsz48.svg';
import {ReactComponent as PasswordConfirmIcon} from 'assets/icons/task_alt_FILL0_wght600_GRAD0_opsz48.svg';
import SubmitButton from 'components/atoms/SubmitButton';
import StyledResetPasswordForm from 'components/organisms/ResetPasswordForm/ResetPasswordForm.styles';
import styled from 'styled-components';
import validationRegexes from 'utils/validationRegexes';
import useResetPassword from 'hooks/useResetPassword';
import LoadingDots from 'components/atoms/LoadingDots';
import FloatingMessage from 'components/molecules/FloatingMessage/FloatingMessage';

const ResetPasswordForm = () => {
  const {register, submitWithPrevent, resetPasswordError, passwordSuccessfullyReset, isLoading} =
    useResetPassword();
  return (
    <StyledResetPasswordForm onSubmit={submitWithPrevent}>
      {!passwordSuccessfullyReset ? (
        <>
          <InputWithIcon
            type={'password'}
            id={'password'}
            placeholder={'new password'}
            name={'newPassword'}
            Icon={PasswordIcon}
            {...register('newPassword', {
              required: true,
              validate: val => validationRegexes.passwordRegex.test(val),
            })}
            className={resetPasswordError?.formError?.newPassword ? `error` : ''}
          />
          <InputWithIcon
            type={'password'}
            id={'password-confirm'}
            placeholder={'confirm new password'}
            name={'confirmPassword'}
            Icon={PasswordConfirmIcon}
            {...register('confirmPassword', {
              required: true,
              validate: (val, formValues) =>
                validationRegexes.passwordRegex.test(val) && formValues.newPassword === val,
            })}
            className={resetPasswordError?.formError?.confirmPassword ? `error` : ''}
          />
          <p className="password-info">
            Password should contain at least 8 characters, including letters and digits.
          </p>
        </>
      ) : (
        ''
      )}

      <div className="error-container">
        {resetPasswordError?.formError ? (
          <p className="error-msg">Validation rules violated.</p>
        ) : isLoading ? (
          <LoadingDots />
        ) : (
          ''
        )}
      </div>

      {!passwordSuccessfullyReset ? (
        <SubmitButton className="submit-button" type="submit">
          Reset password
        </SubmitButton>
      ) : (
        <p className="success-msg">Password has been successfully reset.</p>
      )}
    </StyledResetPasswordForm>
  );
};
export default styled(ResetPasswordForm)``;

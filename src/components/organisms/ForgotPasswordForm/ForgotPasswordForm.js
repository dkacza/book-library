import SubmitButton from 'components/atoms/SubmitButton';
import React, {useState} from 'react';
import styled from 'styled-components';
import StyledForgotPasswordForm from 'components/organisms/ForgotPasswordForm/ForgotPasswordForm.styles';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import {ReactComponent as EmailIcon} from 'assets/icons/alternate_email_FILL0_wght600_GRAD0_opsz48.svg';
import BorderlessButton from 'components/atoms/BorderlessButton';
import LoadingDots from 'components/atoms/LoadingDots';
import useForgotPassword from 'hooks/useForgotPassword';

const ForgotPasswordForm = () => {
  const {firstRequestSent, emailTimeoutPresent, register, submitWithPrevent} = useForgotPassword();
  return (
    <StyledForgotPasswordForm onSubmit={submitWithPrevent}>
      <p className="instruction">
        Please provide us with your email address. We will send you a link with a password reset
        token, which will be valid for next ten minutes.
      </p>
      <InputWithIcon
        {...register('email')}
        type={'text'}
        id={'email'}
        name={'email'}
        placeholder={'email'}
        Icon={EmailIcon}
      />
      <div className="submit-container">
        {emailTimeoutPresent ? (
          <LoadingDots />
        ) : !firstRequestSent ? (
          <SubmitButton>Send</SubmitButton>
        ) : (
          <div className="resend">
            <p>Haven't received email yet?</p>
            <BorderlessButton type="submit">Send it again</BorderlessButton>
          </div>
        )}
      </div>
    </StyledForgotPasswordForm>
  );
};

export default styled(ForgotPasswordForm)``;

import React from 'react';
import {Navigate} from 'react-router-dom';
import {StyledForm} from 'components/organisms/LoginForm/LoginForm.styles';

import {ReactComponent as EmailIcon} from 'assets/icons/alternate_email_FILL0_wght600_GRAD0_opsz48.svg';
import {ReactComponent as PasswordIcon} from 'assets/icons/lock_FILL0_wght600_GRAD0_opsz48.svg';

import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import SubmitButton from 'components/atoms/SubmitButton';
import StyledLink from 'components/atoms/StyledLink';
import LoadingDots from 'components/atoms/LoadingDots';
import useLogin from 'hooks/useLogin';
import styled from 'styled-components';

const LoginForm = ({...props}) => {
  const {register, handleLoginSubmit, isLoading, loginError, navigate} = useLogin();
  return (
    <StyledForm className={props.className} onSubmit={handleLoginSubmit}>
      <InputWithIcon
        {...register('email', {required: true})}
        type={'text'}
        id={'email'}
        name={'email'}
        placeholder={'email'}
        Icon={EmailIcon}
        error={loginError?.formError?.email}
      />

      <InputWithIcon
        {...register('password', {required: true})}
        type={'password'}
        id={'password'}
        name={'password'}
        placeholder={'password'}
        Icon={PasswordIcon}
        error={loginError?.formError?.password}
      />

      <StyledLink to="/forgot-password">Forgot the password?</StyledLink>

      <SubmitButton type="submit">sign in</SubmitButton>

      <div className="message-section">
        {isLoading ? <LoadingDots /> : ''}
        {loginError?.formError ? (
          <p className="error">Email and password are required to log in</p>
        ) : (
          ''
        )}
        {loginError?.dataProviderError ? (
          <p className="error">{loginError.dataProviderError}</p>
        ) : (
          ''
        )}
      </div>

      {navigate ? <Navigate to="/books" /> : ''}
    </StyledForm>
  );
};

export default styled(LoginForm)``;

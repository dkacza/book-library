import React, { useEffect, useState } from 'react';
import { StyledForm } from 'components/organisms/LoginForm/LoginForm.styles';

import { ReactComponent as EmailIcon } from 'assets/icons/alternate_email_FILL0_wght600_GRAD0_opsz48.svg';
import { ReactComponent as PasswordIcon } from 'assets/icons/lock_FILL0_wght600_GRAD0_opsz48.svg';

import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import SubmitButton from 'components/atoms/SubmitButton';
import { StyledLink } from 'components/atoms/StyledLink';
import { set, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState('');
  const [navigate, setNavigate] = useState(false);

  const onSubmit = (data) => {
    // FAKE LOGIN
    try {
      if (data.email !== 'abc' || data.password !== 'def' ) throw new Error('Wrong email or password');
      setErrorMessage('');
      setNavigate(true);

    } catch (err) {
      setErrorMessage(err.message)
    }
  };
  const onError = (err) => {
    console.log('errors');
    console.log(err);
    setErrorMessage('Email and password are required to sign in')
  }
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit, onError)}>
      <InputWithIcon {...register('email', { required: true })} type={'text'} id={'email'} name={'email'} Icon={EmailIcon} error={errors.email}/>
      <InputWithIcon {...register('password', { required: true })} type={'password'} id={'password'} name={'password'} Icon={PasswordIcon} error={errors.password}/>

      <StyledLink to="/reset-password">Forgot the password?</StyledLink>
      <SubmitButton className="submit-button" type="submit">
        sign in
      </SubmitButton>

      {errorMessage ? <p className="error-message">{errorMessage}</p> : ''}
      {navigate ? <Navigate to="/dashboard" /> : ''}

    </StyledForm>
  );
};

export default LoginForm;

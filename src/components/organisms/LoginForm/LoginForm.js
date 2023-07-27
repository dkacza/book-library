import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import axios from 'api/axios';
import { setCookie } from 'utils/cookies';
import AuthContext from 'providers/AuthProvider';
import { StyledForm } from 'components/organisms/LoginForm/LoginForm.styles';

import { ReactComponent as EmailIcon } from 'assets/icons/alternate_email_FILL0_wght600_GRAD0_opsz48.svg';
import { ReactComponent as PasswordIcon } from 'assets/icons/lock_FILL0_wght600_GRAD0_opsz48.svg';

import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import SubmitButton from 'components/atoms/SubmitButton';
import { StyledLink } from 'components/atoms/StyledLink';
import LoadingDots from 'components/atoms/LoadingDots';

const LoginForm = ({redirectMessage}) => {
  const { setAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState(redirectMessage);
  const [navigate, setNavigate] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    setErrorMessage('');
    axios
      .post('/users/login', {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        const userData = res.data.data.user;
        setAuth(userData);
        const cookieVal = userData._id;
        setCookie('user', cookieVal, 1);
        setErrorMessage('');
        setNavigate(true);
      })
      .catch((err) => {
        const message = err?.response?.data?.message || 'Connection error';
        setErrorMessage(message);
      })
      .finally(() => setIsLoading(false));
  };
  const onError = (err) => {
    setErrorMessage('Email and password are required to sign in');
  };
  useEffect(() => {
    const listener = (e) => {
      if (e.code !== 'Enter') return;
      e.preventDefault();
      handleSubmit(onSubmit, onError)();
    }
    document.addEventListener('keydown', listener)
    setFocus('email');
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, []);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit, onError)}>
      <InputWithIcon {...register('email', { required: true })} type={'text'} id={'email'} name={'email'} Icon={EmailIcon} error={errors.email} />

      <InputWithIcon
        {...register('password', { required: true })}
        type={'password'}
        id={'password'}
        name={'password'}
        Icon={PasswordIcon}
        error={errors.password}
      />

      <StyledLink to="/reset-password">Forgot the password?</StyledLink>

      <SubmitButton className="submit-button" type="submit">
        sign in
      </SubmitButton>

      <div className='message-section'>
        {isLoading ? <LoadingDots/> : ''}
        {errorMessage ? <p className="error">{errorMessage}</p> : ''}
      </div>


      {navigate ? <Navigate to="/books" /> : ''}
    </StyledForm>
  );
};

export default LoginForm;

import React, { useEffect, useState } from 'react';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';

import { ReactComponent as EmailIcon } from 'assets/icons/alternate_email_FILL0_wght600_GRAD0_opsz48.svg';
import { ReactComponent as PhoneIcon } from 'assets/icons/call_FILL0_wght600_GRAD0_opsz48.svg';
import { ReactComponent as PasswordIcon } from 'assets/icons/lock_FILL0_wght600_GRAD0_opsz48.svg';
import { ReactComponent as PersonIcon } from 'assets/icons/person_FILL0_wght600_GRAD0_opsz48.svg';
import { ReactComponent as PasswordConfirmIcon } from 'assets/icons/task_alt_FILL0_wght600_GRAD0_opsz48.svg';

import SubmitButton from 'components/atoms/SubmitButton';
import LabeledCheckbox from 'components/molecules/LabeledCheckbox';
import StyledForm from 'components/organisms/RegisterForm/RegisterForm.styles';

import { useForm } from 'react-hook-form';

const NAME_REGEX = /^[A-Z][a-zA-Z'-]+(?:\s[A-Z][a-zA-Z'-]+)?$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_REGEX = /^(?:(?:\+?\d{1,3}\s?)?(?:\(\d{1,}\)|\d{1,})[-.\s]?){1,}\d{1,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setFocus('firstName');
  }, [setFocus]);

  const onSubmit = (data) => {
    setErrorMessage('');
    console.log('submit register');
    console.log(data);
    setErrorMessage('');
  };
  const onError = (err) => {
    setErrorMessage('');
    if (err?.agreement) {
      setErrorMessage('You have to accept the terms of service in order to register');
      return;
    }
    console.log('register errors');
    console.log(err);
    for (const [, value] of Object.entries(err)) {
      if (value.type === 'required') {
        setErrorMessage('Please fill all the fields in the form');
        return;
      }
    }
    setErrorMessage('Make sure, that values you have passed are in correct form.');
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit, onError)}>
      <InputWithIcon
        {...register('first-name', {
          required: true,
          validate: (val) => NAME_REGEX.test(val),
        })}
        type={'text'}
        id={'first-name'}
        name={'first-name'}
        Icon={PersonIcon}
        error={errors['first-name']}
      ></InputWithIcon>

      <InputWithIcon
        {...register('last-name', { required: true, validate: (val) => NAME_REGEX.test(val) })}
        type={'text'}
        id={'last-name'}
        name={'last-name'}
        Icon={PersonIcon}
        error={errors['last-name']}
      ></InputWithIcon>

      <InputWithIcon
        {...register('email', { required: true, validate: (val) => EMAIL_REGEX.test(val) })}
        type={'text'}
        id={'email'}
        name={'email'}
        Icon={EmailIcon}
        error={errors.email}
      ></InputWithIcon>

      <InputWithIcon
        {...register('phone', { required: true, validate: (val) => PHONE_REGEX.test(val) })}
        type={'text'}
        id={'phone'}
        name={'phone'}
        Icon={PhoneIcon}
        error={errors.phone}
      ></InputWithIcon>

      <InputWithIcon
        {...register('password', { required: true, validate: (val) => PASSWORD_REGEX.test(val) })}
        type={'password'}
        id={'password'}
        name={'password'}
        Icon={PasswordIcon}
        error={errors.password}
      ></InputWithIcon>

      <InputWithIcon
        {...register('password-confirm', {
          required: true,
          validate: (val, formValues) => val === formValues.password,
        })}
        type={'password'}
        id={'password-confirm'}
        name={'password-confirm'}
        Icon={PasswordConfirmIcon}
        error={errors['password-confirm']}
      ></InputWithIcon>

      <p className="password-info">Password should contain at least 8 characters, including letters and digits.</p>

      <LabeledCheckbox
        name={'agreement'}
        id="agreement"
        label={'I agree with the terms of service.'}
        {...register('agreement', {required: true})}
      />

      <SubmitButton className="submit-button" type="submit">
        Register
      </SubmitButton>

      <p className={`error-message ${errorMessage ? '' : 'hidden'}`}>{errorMessage}</p>
    </StyledForm>
  );
};
export default RegisterForm;

import React from 'react';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import { ReactComponent as EmailIcon } from 'assets/icons/alternate_email_FILL0_wght600_GRAD0_opsz48.svg';
import { ReactComponent as PhoneIcon } from 'assets/icons/call_FILL0_wght600_GRAD0_opsz48.svg';
import { ReactComponent as PasswordIcon } from 'assets/icons/lock_FILL0_wght600_GRAD0_opsz48.svg';
import { ReactComponent as PersonIcon } from 'assets/icons/person_FILL0_wght600_GRAD0_opsz48.svg';
import { ReactComponent as PasswordConfirmIcon } from 'assets/icons/task_alt_FILL0_wght600_GRAD0_opsz48.svg';
import SubmitButton from 'components/atoms/SubmitButton';
import LabeledCheckbox from 'components/molecules/LabeledCheckbox';
import StyledForm from 'components/organisms/RegisterForm/RegisterForm.styles';
import { Navigate } from 'react-router-dom';
import useRegister from 'hooks/useRegister';
import styled from 'styled-components';

const RegisterForm = () => {
  const { validationRegexes, register, handleRegister, errors, errorMessage, navigate } = useRegister();

  return (
    <StyledForm onSubmit={handleRegister}>
      <InputWithIcon
        {...register('first-name', {
          required: true,
          validate: (val) => validationRegexes.nameRegex.test(val),
        })}
        type={'text'}
        id={'first-name'}
        name={'first-name'}
        placeholder={'first name'}
        Icon={PersonIcon}
        error={errors['first-name']}
      ></InputWithIcon>

      <InputWithIcon
        {...register('last-name', { required: true, validate: (val) => validationRegexes.nameRegex.test(val) })}
        type={'text'}
        id={'last-name'}
        name={'last-name'}
        placeholder={'last name'}
        Icon={PersonIcon}
        error={errors['last-name']}
      ></InputWithIcon>

      <InputWithIcon
        {...register('email', { required: true, validate: (val) => validationRegexes.emailRegex.test(val) })}
        type={'text'}
        id={'email'}
        name={'email'}
        placeholder={'email address'}
        Icon={EmailIcon}
        error={errors.email}
      ></InputWithIcon>

      <InputWithIcon
        {...register('phone', { required: true, validate: (val) => validationRegexes.phoneRegex.test(val) })}
        type={'text'}
        id={'phone'}
        name={'phone'}
        placeholder={'phone number'}
        Icon={PhoneIcon}
        error={errors.phone}
      ></InputWithIcon>

      <InputWithIcon
        {...register('password', { required: true, validate: (val) => validationRegexes.passwordRegex.test(val) })}
        type={'password'}
        id={'password'}
        name={'password'}
        placeholder={'password'}
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
        placeholder={'confirm password'}
        Icon={PasswordConfirmIcon}
        error={errors['password-confirm']}
      ></InputWithIcon>

      <p className="password-info">Password should contain at least 8 characters, including letters and digits.</p>

      <LabeledCheckbox
        name={'agreement'}
        id="agreement"
        label={'I agree with the terms of service.'}
        {...register('agreement', { required: true })}
      />

      <SubmitButton type="submit">
        Register
      </SubmitButton>

      <p className={`error-message ${errorMessage ? '' : 'hidden'}`}>{errorMessage}</p>

      {navigate ? <Navigate to="/books" /> : ''}
    </StyledForm>
  );
};
export default styled(RegisterForm)``;

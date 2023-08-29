import React from 'react';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import {ReactComponent as EmailIcon} from 'assets/icons/alternate_email_FILL0_wght600_GRAD0_opsz48.svg';
import {ReactComponent as PhoneIcon} from 'assets/icons/call_FILL0_wght600_GRAD0_opsz48.svg';
import {ReactComponent as PasswordIcon} from 'assets/icons/lock_FILL0_wght600_GRAD0_opsz48.svg';
import {ReactComponent as PersonIcon} from 'assets/icons/person_FILL0_wght600_GRAD0_opsz48.svg';
import {ReactComponent as PasswordConfirmIcon} from 'assets/icons/task_alt_FILL0_wght600_GRAD0_opsz48.svg';
import SubmitButton from 'components/atoms/SubmitButton';
import LabeledCheckbox from 'components/molecules/LabeledCheckbox/LabeledCheckbox';
import StyledForm from 'components/organisms/RegisterForm/RegisterForm.styles';
import {Navigate} from 'react-router-dom';
import useRegister from 'hooks/useRegister';
import styled from 'styled-components';
import validationRegexes from 'utils/validationRegexes';
import LoadingDots from 'components/atoms/LoadingDots';

const RegisterForm = ({...props}) => {
  const {register, handleRegister, isLoading, registerError, navigate} = useRegister();

  return (
    <StyledForm className={props.className} onSubmit={handleRegister}>
      <InputWithIcon
        {...register('firstName', {
          required: true,
          validate: val => validationRegexes.nameRegex.test(val),
        })}
        type={'text'}
        id={'first-name'}
        name={'firstName'}
        placeholder={'first name'}
        Icon={PersonIcon}
        error={registerError?.formError?.firstName}
      ></InputWithIcon>

      <InputWithIcon
        {...register('lastName', {
          required: true,
          validate: val => validationRegexes.nameRegex.test(val),
        })}
        type={'text'}
        id={'last-name'}
        name={'lastName'}
        placeholder={'last name'}
        Icon={PersonIcon}
        error={registerError?.formError?.lastName}
      ></InputWithIcon>

      <InputWithIcon
        {...register('email', {
          required: true,
          validate: val => validationRegexes.emailRegex.test(val),
        })}
        type={'text'}
        id={'email'}
        name={'email'}
        placeholder={'email address'}
        Icon={EmailIcon}
        error={registerError?.formError?.email}
      ></InputWithIcon>

      <InputWithIcon
        {...register('phoneNumber', {
          required: true,
          validate: val => validationRegexes.phoneRegex.test(val),
        })}
        type={'text'}
        id={'phone-number'}
        name={'phoneNumber'}
        placeholder={'phone number'}
        Icon={PhoneIcon}
        error={registerError?.formError?.phoneNumber}
      ></InputWithIcon>

      <InputWithIcon
        {...register('password', {
          required: true,
          validate: val => validationRegexes.passwordRegex.test(val),
        })}
        type={'password'}
        id={'password'}
        name={'password'}
        placeholder={'password'}
        Icon={PasswordIcon}
        error={registerError?.formError?.password}
      ></InputWithIcon>

      <InputWithIcon
        {...register('passwordConfirm', {
          required: true,
          validate: (val, formValues) => val === formValues.password,
        })}
        type={'password'}
        id={'password-confirm'}
        name={'passwordConfirm'}
        placeholder={'confirm password'}
        Icon={PasswordConfirmIcon}
        error={registerError?.formError?.passwordConfirm}
      ></InputWithIcon>

      <p className="password-info">
        Password should contain at least 8 characters, including letters and digits.
      </p>

      <LabeledCheckbox
        name={'agreement'}
        id="agreement"
        label={'I agree with the terms of service.'}
        {...register('agreement', {required: true})}
      />

      <SubmitButton type="submit">Register</SubmitButton>

      <div className="message-section">
        {isLoading ? <LoadingDots /> : ''}
        {registerError?.validationMessage ? (
          <p className="error">{registerError.validationMessage}</p>
        ) : (
          ''
        )}
        {registerError?.dataProviderError ? (
          <p className="error">{registerError.dataProviderError}</p>
        ) : (
          ''
        )}
      </div>

      {navigate ? <Navigate to="/books" /> : ''}
    </StyledForm>
  );
};
export default styled(RegisterForm)``;

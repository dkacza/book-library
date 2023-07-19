import React from 'react';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';

import { ReactComponent as EmailIcon } from 'assets/icons/alternate_email_FILL0_wght600_GRAD0_opsz48.svg'
import {ReactComponent as PhoneIcon} from 'assets/icons/call_FILL0_wght600_GRAD0_opsz48.svg';
import {ReactComponent as PasswordIcon} from 'assets/icons/lock_FILL0_wght600_GRAD0_opsz48.svg';
import {ReactComponent as PersonIcon} from 'assets/icons/person_FILL0_wght600_GRAD0_opsz48.svg';
import {ReactComponent as PasswordConfirmIcon} from 'assets/icons/task_alt_FILL0_wght600_GRAD0_opsz48.svg';
import SubmitButton from 'components/atoms/SubmitButton';
import LabeledCheckbox from 'components/molecules/LabeledCheckbox';
import StyledForm from 'components/organisms/RegisterForm/RegisterForm.styles';

const RegisterForm = () => {
  return (
    <StyledForm>
      <InputWithIcon type={'text'} id={'first-name'} name={'first name'} Icon={PersonIcon}></InputWithIcon>
      <InputWithIcon type={'text'} id={'last-name'} name={'last name'} Icon={PersonIcon}></InputWithIcon>

      <InputWithIcon type={'text'} id={'email'} name={'email'} Icon={EmailIcon}></InputWithIcon>
      <InputWithIcon type={'text'} id={'phone'} name={'phone'} Icon={PhoneIcon}></InputWithIcon>

      <InputWithIcon type={'password'} id={'password'} name={'password'} Icon={PasswordIcon}></InputWithIcon>
      <InputWithIcon type={'password'} id={'password-confirm'} name={'password confirm'} Icon={PasswordConfirmIcon}></InputWithIcon>

      <LabeledCheckbox id="agreement" label={"I agree with the terms of service."}/>

      <SubmitButton className="submit-button">Register</SubmitButton>
    </StyledForm>
  );
}
export default RegisterForm;
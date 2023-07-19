import React from 'react';
import ButtonWithIcon from 'components/molecules/ButtonWithIcon/ButtonWithIcon';

import { ReactComponent as EmailIcon } from 'assets/icons/alternate_email_FILL0_wght600_GRAD0_opsz48.svg'
import {ReactComponent as PhoneIcon} from 'assets/icons/call_FILL0_wght600_GRAD0_opsz48.svg';
import {ReactComponent as PasswordIcon} from 'assets/icons/lock_FILL0_wght600_GRAD0_opsz48.svg';
import {ReactComponent as PersonIcon} from 'assets/icons/person_FILL0_wght600_GRAD0_opsz48.svg';
import {ReactComponent as PasswordConfirmIcon} from 'assets/icons/task_alt_FILL0_wght600_GRAD0_opsz48.svg';
import SubmitButton from 'components/atoms/SubmitButton';
import LabeledCheckbox from 'components/molecules/LabeledCheckbox';

const RegisterForm = () => {
  return (
    <form>
      <ButtonWithIcon type={'text'} id={'first-name'} name={'first name'} Icon={PersonIcon}></ButtonWithIcon>
      <ButtonWithIcon type={'text'} id={'last-name'} name={'last name'} Icon={PersonIcon}></ButtonWithIcon>

      <ButtonWithIcon type={'text'} id={'email'} name={'email'} Icon={EmailIcon}></ButtonWithIcon>
      <ButtonWithIcon type={'text'} id={'phone'} name={'phone'} Icon={PhoneIcon}></ButtonWithIcon>

      <ButtonWithIcon type={'password'} id={'password'} name={'password'} Icon={PasswordIcon}></ButtonWithIcon>
      <ButtonWithIcon type={'password'} id={'password-confirm'} name={'password confirm'} Icon={PasswordConfirmIcon}></ButtonWithIcon>

      <LabeledCheckbox id="agreement" label={"I agree with terms of service of the municipal library in Skoczów"}/>

      <SubmitButton>Register</SubmitButton>
    </form>
  );
}
export default RegisterForm;
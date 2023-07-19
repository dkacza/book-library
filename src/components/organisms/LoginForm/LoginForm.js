import React from 'react';
import {
  StyledForm,
} from 'components/organisms/LoginForm/LoginForm.styles';

import { ReactComponent as EmailIcon } from 'assets/icons/alternate_email_FILL0_wght600_GRAD0_opsz48.svg'
import { ReactComponent as PasswordIcon } from 'assets/icons/lock_FILL0_wght600_GRAD0_opsz48.svg';

import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import SubmitButton from 'components/atoms/SubmitButton';
import { StyledLink } from 'components/atoms/StyledLink';

const LoginForm = () => {
  return (
    <StyledForm>
      <InputWithIcon type={'text'} id={'email'} name={'email'} Icon={EmailIcon}/>
      <InputWithIcon type={'password'} id={'password'} name={'password'} Icon={PasswordIcon} />
      <StyledLink to="/reset-password">Forgot the password?</StyledLink>
      <SubmitButton className="submit-button" type="submit">login</SubmitButton>
    </StyledForm>
  );
};

export default LoginForm;

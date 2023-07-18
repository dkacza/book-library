import React from 'react';
import { PositionedButtonWithIcon, StyledForm } from 'components/organisms/LoginForm/LoginForm.styles';
import ButtonWithIcon from 'components/molecules/ButtonWithIcon/ButtonWithIcon';

import { ReactComponent as EmailIcon } from 'assets/icons/alternate_email_FILL0_wght600_GRAD0_opsz48.svg'
import { ReactComponent as PasswordIcon } from 'assets/icons/lock_FILL0_wght600_GRAD0_opsz48.svg';


const LoginForm = () => {
  const loginSubmit = () => {
    console.log('login');
  };

  return (
    <StyledForm onSubmit={loginSubmit}>
      <PositionedButtonWithIcon type={'text'} id={'email'} name={'email'} Icon={EmailIcon}/>
      <PositionedButtonWithIcon type={'password'} id={'password'} name={'password'} Icon={PasswordIcon} />
      <a href="#">Forgot the password?</a>
      <button type="submit">login</button>
    </StyledForm>
  );
};

export default LoginForm;

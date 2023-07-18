import React from 'react';
import Title from 'components/atoms/Title';
import LoginForm from 'components/organisms/LoginForm/LoginForm';
import { PositionedLanguageButton, StyledLink, Wrapper } from 'components/templates/LoginSection/LoginSection.styles';

const LoginSection = () => {
  return (
    <Wrapper>
      <Title>Sign in</Title>
      <LoginForm></LoginForm>
      <p>First time in our library?</p>
      <StyledLink to="/register">Sign up</StyledLink>
      <PositionedLanguageButton></PositionedLanguageButton>
    </Wrapper>
  );
};

export default LoginSection;

import React from 'react';
import Title from 'components/atoms/Title';
import LoginForm from 'components/organisms/LoginForm/LoginForm';
import { Wrapper } from 'components/templates/LoginSection/LoginSection.styles';

const LoginSection = () => {
  return (
    <Wrapper>
      <Title>Sign in</Title>
      <LoginForm></LoginForm>
      <p>First time in our library?</p>
      <a href="#">Sign up</a>
      <button className="language-change">polish</button>
    </Wrapper>
  );
};

export default LoginSection;

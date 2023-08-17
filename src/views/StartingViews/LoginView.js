import React from 'react';
import StartingViewTemplate from 'views/StartingViews/StartingViewTemplate';
import AsidePhoto from 'components/organisms/AsidePhoto/AsidePhoto';
import LoginForm from 'components/organisms/LoginForm/LoginForm';
import LinkWithDescription from 'components/atoms/LinkWithDescrption';
import Title from 'components/atoms/Title';

const LoginView = () => {
  return (
    <StartingViewTemplate>
      <AsidePhoto />
      <main>
        <Title>Log in</Title>
        <LoginForm />
        <LinkWithDescription
          description={'First time in our library?'}
          linkName={'Sign up'}
          destination={'/register'}
        ></LinkWithDescription>
      </main>
    </StartingViewTemplate>
  );
};
export default LoginView;

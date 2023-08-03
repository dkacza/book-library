import React from 'react';
import StartingViewTemplate from 'views/StartingViews/StartingViewTemplate';
import AsidePhoto from 'components/organisms/AsidePhoto/AsidePhoto';
import LoginForm from 'components/organisms/LoginForm/LoginForm';
import StartingMainSection from 'components/templates/StartingMainSection/StartingMainSection';
import LinkWithDescription from 'components/molecules/LinkWithDescrption';
import Title from 'components/atoms/Title';

const LoginView = () => {
  return (
    <StartingViewTemplate>
      <AsidePhoto />
      <StartingMainSection>
        <Title>Log in</Title>
        <LoginForm />
        <LinkWithDescription
          description={'First time in our library?'}
          linkName={'Sign up'}
          destination={'/register'}
        ></LinkWithDescription>
      </StartingMainSection>
    </StartingViewTemplate>
  );
};
export default LoginView;

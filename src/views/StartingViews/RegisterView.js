import React from 'react';
import StartingViewTemplate from 'views/StartingViews/StartingViewTemplate';
import AsidePhoto from 'components/organisms/AsidePhoto/AsidePhoto';
import LinkWithDescription from 'components/atoms/LinkWithDescrption';
import RegisterForm from 'components/organisms/RegisterForm/RegisterForm';
import Title from 'components/atoms/Title';

const RegisterView = () => {
  return (
    <StartingViewTemplate>
      <AsidePhoto />
      <main>
        <Title>Sign up</Title>
        <RegisterForm />
        <LinkWithDescription
          description={'Already have an account?'}
          linkName={'Log in'}
          destination={'/login'}
        ></LinkWithDescription>
      </main>
    </StartingViewTemplate>
  );
};
export default RegisterView;

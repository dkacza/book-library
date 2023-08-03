import React from 'react';
import StartingViewTemplate from 'views/StartingViews/StartingViewTemplate';
import AsidePhoto from 'components/organisms/AsidePhoto/AsidePhoto';
import LinkWithDescription from 'components/molecules/LinkWithDescrption';
import StartingMainSection from 'components/templates/StartingMainSection/StartingMainSection';
import RegisterForm from 'components/organisms/RegisterForm/RegisterForm';

const RegisterView = () => {
  return (
    <StartingViewTemplate>
      <AsidePhoto />
      <StartingMainSection
        heading="Sign in"
        children={
          <>
            <RegisterForm />
            <LinkWithDescription
              description={'Already have an account?'}
              linkName={'Log in'}
              destination={'/login'}
            ></LinkWithDescription>
          </>
        }
      ></StartingMainSection>
    </StartingViewTemplate>
  );
};
export default RegisterView;

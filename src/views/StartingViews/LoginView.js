import React from 'react';
import StartingViewTemplate from 'views/StartingViews/StartingViewTemplate';
import AsidePhoto from 'components/organisms/AsidePhoto/AsidePhoto';
import LanguageButton from 'components/atoms/LanguageButton';
import LoginForm from 'components/organisms/LoginForm/LoginForm';
import StartingMainSection from 'components/templates/StartingMainSection/StartingMainSection';
import LinkWithDescription from 'components/molecules/LinkWithDescrption';

const LoginView = () => {
  return (
    <StartingViewTemplate>
      <AsidePhoto></AsidePhoto>
      <StartingMainSection
        heading="Log in"
        children={
          <>
            <LoginForm></LoginForm>
            <LinkWithDescription description={'First time in our library?'} linkName={'Sign up'} destination={'/register'}></LinkWithDescription>
          </>
        }
      ></StartingMainSection>
      <LanguageButton className="languageToggle"></LanguageButton>
    </StartingViewTemplate>
  );
};
export default LoginView;

import React from 'react';
import StartingViewsStyles from 'views/StartingViews.styles';
import AsidePhoto from 'components/organisms/AsidePhoto/AsidePhoto';
import LanguageButton from 'components/atoms/LanguageButton';
import LoginForm from 'components/organisms/LoginForm/LoginForm';
import StartingMainSection from 'components/templates/StartingMainSection/StartingMainSection';
import LinkWithDescription from 'components/molecules/LinkWithDescrption';

const LoginView = () => {
  return (
    <StartingViewsStyles>
      <AsidePhoto></AsidePhoto>
      <StartingMainSection
        heading="Log in"
        children={
          <>
            <LoginForm></LoginForm>
            <LinkWithDescription description={'First time in our library?'} linkName={"Sign up"} destination={"/register"}></LinkWithDescription>
          </>
        }
      ></StartingMainSection>
      <LanguageButton className="languageToggle"></LanguageButton>
    </StartingViewsStyles>
  );
};
export default LoginView;

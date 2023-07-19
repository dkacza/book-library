import React from 'react';
import StartingViewsStyles from 'views/StartingViews.styles';
import AsidePhoto from 'components/organisms/AsidePhoto/AsidePhoto';
import LanguageButton from 'components/atoms/LanguageButton';
import LinkWithDescription from 'components/molecules/LinkWithDescrption';
import StartingMainSection from 'components/templates/StartingMainSection/StartingMainSection';
import RegisterForm from 'components/organisms/RegisterForm/RegisterForm';

const RegisterView = () => {
  return (
    <StartingViewsStyles>
      <AsidePhoto />
      <StartingMainSection
        heading="Sign in"
        children={
          <>
            <RegisterForm/>
            <LinkWithDescription description={'Already have an account?'} linkName={"Log in"} destination={"/login"}></LinkWithDescription>
          </>
        }
      ></StartingMainSection>
      <LanguageButton className="languageToggle"></LanguageButton>
    </StartingViewsStyles>
  );
};
export default RegisterView;

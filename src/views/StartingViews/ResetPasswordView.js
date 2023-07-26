import React from 'react';
import StartingViewTemplate from 'views/StartingViews/StartingViewTemplate';
import AsidePhoto from 'components/organisms/AsidePhoto/AsidePhoto';
import StartingMainSection from 'components/templates/StartingMainSection/StartingMainSection';
import LanguageButton from 'components/atoms/LanguageButton';
import { StyledLink } from 'components/atoms/StyledLink';
import ResetPasswordForm from 'components/organisms/ResetPasswordForm/ResetPasswordForm';

const ResetPasswordView = () => {
  return (
    <StartingViewTemplate>
      <AsidePhoto />
      <StartingMainSection
        heading="Reset password"
        children={
          <>
            <ResetPasswordForm />
            <StyledLink to={'/'}>Return to main page</StyledLink>
          </>
        }
      ></StartingMainSection>
      <LanguageButton className="languageToggle"></LanguageButton>
    </StartingViewTemplate>
  );
};
export default ResetPasswordView;

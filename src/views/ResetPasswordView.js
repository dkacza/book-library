import React from 'react';
import StartingViewsStyles from 'views/StartingViews.styles';
import AsidePhoto from 'components/organisms/AsidePhoto/AsidePhoto';
import StartingMainSection from 'components/templates/StartingMainSection/StartingMainSection';
import LanguageButton from 'components/atoms/LanguageButton';
import { StyledLink } from 'components/atoms/StyledLink';
import ResetPasswordForm from 'components/organisms/ResetPasswordForm/ResetPasswordForm';

const ResetPasswordView = () => {
  return (
    <StartingViewsStyles>
      <AsidePhoto />
      <StartingMainSection
        heading="Reset password"
        children={
          <>
            <ResetPasswordForm/>
            <StyledLink to={"/"}>Return to main page</StyledLink>
          </>
        }
      ></StartingMainSection>
      <LanguageButton className="languageToggle"></LanguageButton>
    </StartingViewsStyles>
  );
};
export default ResetPasswordView;
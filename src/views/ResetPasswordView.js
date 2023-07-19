import React from 'react';
import StartingViewsStyles from 'views/StartingViews.styles';
import AsidePhoto from 'components/organisms/AsidePhoto/AsidePhoto';
import StartingMainSection from 'components/templates/StartingMainSection/StartingMainSection';
import LanguageButton from 'components/atoms/LanguageButton';
import { StyledLink } from 'components/atoms/StyledLink';

const ResetPasswordView = () => {
  return (
    <StartingViewsStyles>
      <AsidePhoto />
      <StartingMainSection
        heading="Reset password"
        children={
          <>
            <div>RESET PASSWORD FORM HERE</div>
            <StyledLink to={"/"}>Return to main page</StyledLink>
          </>
        }
      ></StartingMainSection>
      <LanguageButton className="languageToggle"></LanguageButton>
    </StartingViewsStyles>
  );
};
export default ResetPasswordView;
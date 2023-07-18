import React from 'react';
import { StyledViewWrapper } from 'views/StartView/StartView.styles';
import AsidePhoto from 'components/organisms/AsidePhoto/AsidePhoto';
import LoginSection from 'components/templates/LoginSection/LoginSection';

const StartView = () => {
  return (
    <StyledViewWrapper>
      <AsidePhoto></AsidePhoto>
      <LoginSection></LoginSection>
    </StyledViewWrapper>
  );
};
export default StartView;

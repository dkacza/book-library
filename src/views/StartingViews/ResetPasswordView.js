import React from 'react';
import StartingViewTemplate from 'views/StartingViews/StartingViewTemplate';
import AsidePhoto from 'components/organisms/AsidePhoto/AsidePhoto';
import StyledLink from 'components/atoms/StyledLink';
import ResetPasswordForm from 'components/organisms/ResetPasswordForm/ResetPasswordForm';
import Title from 'components/atoms/Title';

const ResetPasswordView = () => {
  return (
    <StartingViewTemplate>
      <AsidePhoto />
      <main>
        <Title>Reset Password</Title>
        <ResetPasswordForm />
        <StyledLink to={'/'}>Return to main page</StyledLink>
      </main>
    </StartingViewTemplate>
  );
};
export default ResetPasswordView;

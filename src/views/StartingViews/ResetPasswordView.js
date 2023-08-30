import React from 'react';
import StartingViewTemplate from 'views/StartingViews/StartingViewTemplate';
import AsidePhoto from 'components/organisms/AsidePhoto/AsidePhoto';
import StyledLink from 'components/atoms/StyledLink';
import ResetPasswordForm from 'components/organisms/ResetPasswordForm/ResetPasswordForm';
import Title from 'components/atoms/Title';
import FloatingMessage from 'components/molecules/FloatingMessage/FloatingMessage';
import useResetPassword from 'hooks/useResetPassword';

const ResetPasswordView = () => {
  const {resetPasswordError} = useResetPassword();
  return (
    <StartingViewTemplate>
      <AsidePhoto />
      <main>
        <Title>Reset Password</Title>
        <ResetPasswordForm />
        <StyledLink to={'/'}>Return to main page</StyledLink>
        {resetPasswordError?.dataProviderError ? (
          <FloatingMessage error={resetPasswordError?.dataProviderError} />
        ) : (
          ''
        )}
      </main>
    </StartingViewTemplate>
  );
};
export default ResetPasswordView;

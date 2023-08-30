import React, {useContext} from 'react';
import StartingViewTemplate from 'views/StartingViews/StartingViewTemplate';
import AsidePhoto from 'components/organisms/AsidePhoto/AsidePhoto';
import StyledLink from 'components/atoms/StyledLink';
import Title from 'components/atoms/Title';
import ForgotPasswordForm from 'components/organisms/ForgotPasswordForm/ForgotPasswordForm';
import FloatingMessage from 'components/molecules/FloatingMessage/FloatingMessage';
import AuthContext from 'providers/AuthProvider';

const ForgotPasswordView = () => {
  const {forgotPasswordStatus} = useContext(AuthContext);
  return (
    <StartingViewTemplate>
      <AsidePhoto />
      <main>
        <Title>Forgot Password</Title>
        <ForgotPasswordForm></ForgotPasswordForm>
        <StyledLink to={'/login'}>Return to main page</StyledLink>
        {forgotPasswordStatus?.success ? (
          <FloatingMessage success={forgotPasswordStatus.success} />
        ) : (
          ''
        )}
        {forgotPasswordStatus?.error ? <FloatingMessage error={forgotPasswordStatus.error} /> : ''}
      </main>
    </StartingViewTemplate>
  );
};
export default ForgotPasswordView;

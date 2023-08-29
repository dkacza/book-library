import React, {useContext} from 'react';
import StartingViewTemplate from 'views/StartingViews/StartingViewTemplate';
import AsidePhoto from 'components/organisms/AsidePhoto/AsidePhoto';
import LoginForm from 'components/organisms/LoginForm/LoginForm';
import LinkWithDescription from 'components/atoms/LinkWithDescrption';
import Title from 'components/atoms/Title';
import AuthContext from 'providers/AuthProvider';
import FloatingMessage from 'components/molecules/FloatingMessage/FloatingMessage';

const LoginView = () => {
  const {redirectionMessage, redirectionError} = useContext(AuthContext);
  return (
    <StartingViewTemplate>
      <AsidePhoto />
      <main>
        <Title>Log in</Title>
        <LoginForm />
        <LinkWithDescription
          description={'First time in our library?'}
          linkName={'Sign up'}
          destination={'/register'}
        ></LinkWithDescription>
      </main>
      {redirectionMessage ? <FloatingMessage success={redirectionMessage} /> : ''}
      {redirectionError ? <FloatingMessage error={redirectionError} /> : ''}
    </StartingViewTemplate>
  );
};
export default LoginView;

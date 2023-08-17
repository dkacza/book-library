import { MainViewTemplate } from 'views/MainViews/MainViewTemplate';
import Navigation from 'components/organisms/Navigation/Navigation';
import Title from 'components/atoms/Title';
import { useContext } from 'react';
import authProvider from 'providers/AuthProvider';
import PersonalData from 'components/organisms/PersonalData/PersonalData';
import AuthorizationData from 'components/organisms/AuthorizationData/AuthorizationData';

const SettingsView = () => {
  const { auth, setAuth } = useContext(authProvider);
  return (
    <MainViewTemplate>
      <Navigation />
      <main>
        <Title>Settings</Title>
        <section>
          <PersonalData auth={auth} setAuth={setAuth} />
          <AuthorizationData auth={auth} setAuth={setAuth} />
        </section>
      </main>
    </MainViewTemplate>
  );
};
export default SettingsView;

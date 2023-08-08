import { MainViewTemplate } from 'views/MainViews/MainViewTemplate';
import Navigation from 'components/organisms/Navigation/Navigation';
import Title from 'components/atoms/Title';
import { useContext } from 'react';
import authProvider from 'providers/AuthProvider';
import PersonalData from 'components/molecules/PersonalData/PersonalData';
import AuthorizationData from 'components/molecules/AuthorizationData/AuthorizationData';
import ChangeUserDataModal from 'components/organisms/ChangeUserDataModal/ChangeUserDataModal';

const SettingsView = () => {
  const { auth } = useContext(authProvider);
  return (
    <MainViewTemplate>
      <Navigation />
      <main>
        <Title>Settings</Title>
        <section>
          <PersonalData auth={auth} />
          <AuthorizationData auth={auth} />
          {/*  Modal for changing personal data*/}
          {/*<ChangeUserDataModal />*/}
          {/*  Modal for changing password */}
        </section>
      </main>
    </MainViewTemplate>
  );
};
export default SettingsView;

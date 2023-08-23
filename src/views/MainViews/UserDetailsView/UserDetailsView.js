import React from 'react';
import { MainViewTemplate } from 'views/MainViews/MainViewTemplate';
import Navigation from 'components/organisms/Navigation/Navigation';
import Title from 'components/atoms/Title';
import { Navigate } from 'react-router-dom';
import StyledContentSection from 'views/MainViews/UserDetailsView/UserDetailsView.styles';
import StyledLink from 'components/atoms/StyledLink';
import UserDetailsData from 'components/organisms/UserDetailsData/UserDetailsData';
import UserDetailsRole from 'components/organisms/UserDetailsRole/UserDetailsRole';
import useUserDetails from 'hooks/useUserDetails';
import FloatingMessage from 'components/molecules/FloatingMessage/FloatingMessage';

const UserDetailsView = () => {
  const { user, auth, handlePromotion, redirectToMyProfile, userDetailsError } = useUserDetails();

  return (
    <MainViewTemplate>
      <Navigation />
      <main>
        <Title>{user.firstName + ' ' + user.lastName}</Title>
        <StyledContentSection>
          <UserDetailsData user={user} />
          <UserDetailsRole user={user} auth={auth} handlePromotion={handlePromotion} />

          <StyledLink to={'/users'}>Back to the users list</StyledLink>
          {redirectToMyProfile ? <Navigate to="/settings" /> : ''}
        </StyledContentSection>
        {userDetailsError?.dataProviderError ? <FloatingMessage error={userDetailsError.dataProviderError} /> : ''}
      </main>
    </MainViewTemplate>
  );
};

export default UserDetailsView;

import React, { useContext, useEffect, useState } from 'react';
import { MainViewTemplate } from 'views/MainViews/MainViewTemplate';
import Navigation from 'components/organisms/Navigation/Navigation';
import Title from 'components/atoms/Title';
import { Navigate, useParams } from 'react-router-dom';
import authProvider from 'providers/AuthProvider';
import axios from 'api/axios';
import BorderlessButton from 'components/atoms/BorderlessButton';
import StyledContentSection from 'views/MainViews/UserDetailsView/UserDetailsView.styles';
import StyledLink from 'components/atoms/StyledLink';
import UsersContext from 'providers/UsersProvider';

const UserDetailsView = () => {
  const { id } = useParams();
  const { auth } = useContext(authProvider);
  const [user, setUser] = useState({});
  const [errorMsg, setErrorMsg] = useState('Error message');
  const [redirectToMyProfile, setRedirectToMyProfile] = useState(false);

  const {
    getUserById,
    getUserByIdConfirmationMsg,
    getUserByIdErrorMsg,
    patchRole,
    patchRoleConfirmationMsg,
    patchRoleErrorMsg,
    users
  } = useContext(UsersContext);

  const handleRoleChange = (newRole) => {
    patchRole(user._id, { role: newRole });
  };

  useEffect(() => {
    if (auth._id === id) {
      setRedirectToMyProfile(true);
    }
    const getUserFromProvider = async () => {
      const userDetails = await getUserById(id)
      setUser(userDetails)
    }
    getUserFromProvider();
  }, [id, auth, users]);

  return (
    <MainViewTemplate>
      <Navigation />
      <main>
        <Title>{user.firstName + ' ' + user.lastName}</Title>
        <StyledContentSection>
          <div className="first-name">
            <p className="label">First name</p>
            <p className="data">{user.firstName}</p>
          </div>
          <div className="last-name">
            <p className="label">Last name</p>
            <p className="data">{user.lastName}</p>
          </div>
          <div className="email">
            <p className="label">Email address</p>
            <p className="data">{user.email}</p>
          </div>
          <div className="phone">
            <p className="label">Phone number</p>
            <p className="data">{user.phoneNumber}</p>
          </div>
          <div className="registration-date">
            <p className="label">Registration date</p>
            <p className="data">{user.registrationDate}</p>
          </div>
          <div className="eligibility">
            <p className="label">Eligibility</p>
            <p className="data">{user.eligible ? 'Yes' : 'No'}</p>
          </div>

          <div className="role">
            <div className="current-role">
              <p className="label">Current role</p>
              <p className="data">{user.role}</p>
            </div>
            {auth.role === 'admin' ? (
              <div className="promotion">
                <p className="role-label">Change user role</p>
                {user.role !== 'librarian' && user.role !== 'admin' ? (
                  <BorderlessButton onClick={() => handleRoleChange('librarian')}>
                    Promote to librarian
                  </BorderlessButton>
                ) : (
                  ''
                )}
                {user.role !== 'admin' ? (
                  <BorderlessButton onClick={() => handleRoleChange('admin')}>Promote to admin</BorderlessButton>
                ) : (
                  ''
                )}
                {user.role !== 'user' ? (
                  <BorderlessButton className="demote" onClick={() => handleRoleChange('user')}>
                    Demote to regular user
                  </BorderlessButton>
                ) : (
                  ''
                )}
              </div>
            ) : (
              ''
            )}
          </div>

          {errorMsg ? <p className="errorMsg">{errorMsg}</p> : ''}
          <StyledLink to={'/users'}>Back to the users list</StyledLink>
          {redirectToMyProfile ? <Navigate to="/settings" /> : ''}
        </StyledContentSection>
      </main>
    </MainViewTemplate>
  );
};

export default UserDetailsView;

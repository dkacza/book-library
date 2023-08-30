import {useParams} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import authProvider from 'providers/AuthProvider';
import UsersContext from 'providers/UsersProvider';

const useUserDetails = () => {
  const {id} = useParams();
  const {auth} = useContext(authProvider);
  const [user, setUser] = useState({});
  const [redirectToMyProfile, setRedirectToMyProfile] = useState(false);
  const {getUserById, userByIdStatus, patchRole, roleStatus, users, unsetRoleStatus} =
    useContext(UsersContext);
  const [userDetailsError, setUserDetailsError] = useState({});

  const handlePromotion = newRole => {
    patchRole(user._id, {role: newRole});
  };

  // When page loads or user details change, load new user data
  useEffect(() => {
    if (auth._id === id) {
      setRedirectToMyProfile(true);
      return;
    }
    (async () => {
      const userDetails = await getUserById(id);
      setUser(userDetails);
    })();
  }, [id, auth, users]);

  // When providers statuses change, set new error message
  useEffect(() => {
    let errorMsg = userByIdStatus.error;
    if (roleStatus.error) errorMsg += '\n' + roleStatus.error;
    setUserDetailsError({
      dataProviderError: errorMsg,
    });
  }, [userByIdStatus, roleStatus]);

  // Clear providers statuses on initial load
  useEffect(() => {
    unsetRoleStatus();
  }, []);

  return {user, auth, handlePromotion, redirectToMyProfile, userDetailsError};
};

export default useUserDetails;

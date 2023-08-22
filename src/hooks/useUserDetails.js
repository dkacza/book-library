import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import authProvider from 'providers/AuthProvider';
import UsersContext from 'providers/UsersProvider';

const useUserDetailsView = () => {
  const { id } = useParams();
  const { auth } = useContext(authProvider);
  const [user, setUser] = useState({});
  const [redirectToMyProfile, setRedirectToMyProfile] = useState(false);
  const { getUserById, userByIdStatus, setUserByIdStatus, patchRole, roleStatus, setRoleStatus, users } = useContext(UsersContext);

  const handlePromotion = (newRole) => {
    patchRole(user._id, { role: newRole });
  };

  useEffect(() => {
    if (auth._id === id) {
      setRedirectToMyProfile(true);
    }
    const getUserFromProvider = async () => {
      const userDetails = await getUserById(id);
      setUser(userDetails);
    };
    getUserFromProvider();
  }, [id, auth, users]);

  useEffect({
    setRoleStatus({});
    setUserByIdStatus({});
  })

  return { user, auth, handlePromotion, redirectToMyProfile };
};

export default useUserDetailsView;

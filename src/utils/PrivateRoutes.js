import {useContext} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import AuthContext from 'providers/AuthProvider';

const PrivateRoutes = ({permittedRoles}) => {
  const {auth} = useContext(AuthContext);
  return permittedRoles.includes(auth.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};
export default PrivateRoutes;

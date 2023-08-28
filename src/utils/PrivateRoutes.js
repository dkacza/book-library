import { useContext, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from 'providers/AuthProvider';
import isEmptyObject from 'utils/isEmptyObject';


const PrivateRoutes = ({ permittedRoles }) => {
  const { auth, setRedirectionError } = useContext(AuthContext);
  const permission = permittedRoles.includes(auth.role);


  useEffect(() => {
    const unpermittedAccessMessage = !permission && !isEmptyObject(auth) ? '' :
      `You are not permitted to access this route.
    Log into authorized account to continue.`
    setRedirectionError(unpermittedAccessMessage);
  }, [auth])

  return permission ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;

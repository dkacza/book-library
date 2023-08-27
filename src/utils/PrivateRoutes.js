import { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from 'providers/AuthProvider';


const PrivateRoutes = ({ permittedRoles }) => {
  const { auth, setRedirectionError } = useContext(AuthContext);
  const permission = permittedRoles.includes(auth.role);
  useEffect(() => {
    const unpermittedAccessMessage = permission ? '' :
      `You are not permitted to access this route.
    Log into authorized account to continue.`
    setRedirectionError(unpermittedAccessMessage);
  }, [])
  return permission ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;

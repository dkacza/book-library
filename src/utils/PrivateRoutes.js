import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from 'providers/AuthProvider';

console.log('using auth now');
const PrivateRoutes = ({ permittedRoles }) => {
  const { auth } = useContext(AuthContext);
  return permittedRoles.includes(auth.role) ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;

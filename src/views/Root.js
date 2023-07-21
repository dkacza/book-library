import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { GlobalStyle } from 'assets/styles/GlobalStyle';
import LoginView from 'views/LoginView';
import 'assets/styles/fonts.css';
import { BrowserRouter as Router, Link, Navigate, Route, Routes } from 'react-router-dom';
import ResetPasswordView from 'views/ResetPasswordView';
import RegisterView from 'views/RegisterView';

import AuthContext, { AuthProvider } from 'providers/AuthProvider';
import PrivateRoutes from 'utils/PrivateRoutes';
import { useContext } from 'react';

const Root = () => {
  const {auth} = useContext(AuthContext);
  useContext(() => {
    // refresh the auth on reload
    // send GET/users/id to get auth details
    // JWT is already stored in cookies
    // id has to be stored with localstorage
  }, [])
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to={auth ? '/dashboard' : '/login'} />}></Route>

            {/*Publicly available routes*/}
            <Route path="/reset-password" element={<ResetPasswordView />}></Route>
            <Route path="/register" element={<RegisterView />}></Route>
            <Route path="/login" element={<LoginView />}></Route>

            {/*Routes for logged-in users*/}
            <Route element={<PrivateRoutes permittedRoles={['user', 'librarian', 'admin']}/>}>
              <Route path="/dashboard" element={<p>Dashboard <Link to="/settings">Settings</Link> </p>}></Route>
              <Route path="/settings" element={<p>Settings</p>}></Route>
            </Route>

          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default Root;

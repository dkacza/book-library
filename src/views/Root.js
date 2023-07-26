import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Navigate, Route, Routes } from 'react-router-dom';
import axios from 'api/axios';
import { getCookie } from 'utils/cookies';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { GlobalStyle } from 'assets/styles/GlobalStyle';
import 'assets/styles/fonts.css';
import ResetPasswordView from 'views/ResetPasswordView';
import RegisterView from 'views/RegisterView';
import LoginView from 'views/LoginView';
import AuthContext from 'providers/AuthProvider';
import PrivateRoutes from 'utils/PrivateRoutes';
import Spinner from 'components/atoms/Spinner';

const Root = () => {
  const { setAuth, auth } = useContext(AuthContext);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    setAuthChecked(false);
    const userId = getCookie('user');
    axios
      .get(`/users/${userId}`)
      .then((res) => {
        const { user } = res.data.data;
        setAuth(user);
        setAuthChecked(true);
      })
      .catch((err) => {
        console.log('Cannot retrieve authorization data');
      })
      .finally(() => {
        setAuthChecked(true);
      });
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {!authChecked ? (
          <Spinner></Spinner>
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to={auth ? '/dashboard' : '/login'} />}></Route>

            {/*Publicly available routes*/}
            <Route path="/reset-password" element={<ResetPasswordView />}></Route>
            <Route path="/register" element={<RegisterView />}></Route>
            <Route path="/login" element={<LoginView />}></Route>

            {/*Routes for logged-in users*/}
            <Route element={<PrivateRoutes permittedRoles={['user', 'librarian', 'admin']} />}>
              <Route
                path="/dashboard"
                element={
                  <p>
                    Dashboard <Link to="/settings">Settings</Link>{' '}
                  </p>
                }
              ></Route>
              <Route path="/settings" element={<p>Settings</p>}></Route>
            </Route>
          </Routes>
        )}
      </ThemeProvider>
    </Router>
  );
};

export default Root;

import { createContext, useEffect, useState } from 'react';
import axios from 'api/axios';
import { setCookie } from 'utils/cookies';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [redirectionMessage, setRedirectionMessage] = useState('');
  const [redirectionError, setRedirectionError] = useState('');
  const sendLogoutRequest = () => {
    axios
      .get('/users/logout')
      .then((res) => {
        setRedirectionMessage('Successfully logged out');
      })
      .catch((err) => {
        setRedirectionError('Error occured while logging out');
      });
    setCookie('user', 'LOGGED_OUT', 1);
    setAuth({});
  }

  useEffect(() => {
    setRedirectionMessage('');
    setRedirectionError('');
  }, [])

  return <AuthContext.Provider value={{ auth, setAuth, sendLogoutRequest, redirectionMessage, redirectionError }}>{children}</AuthContext.Provider>;
};

export default AuthContext;

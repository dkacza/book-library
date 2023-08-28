import { createContext, useEffect, useState } from 'react';
import axios from 'api/axios';
import { setCookie } from 'utils/cookies';

const AuthContext = createContext({});
const DAYS_TO_EXPIRE = 1;

const INITIAL_STATUS = {
  error: '',
  confirm: '',
};

const setSuccessStatus = (setter, message) => {
  setter({
    error: '',
    success: message,
  });
};
const setErrorStatus = (setter, message) => {
  setter({
    error: message,
    success: '',
  });
};

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
  };

  const [loginStatus, setLoginStatus] = useState({});
  const unsetLoginStatus = () => {
    setLoginStatus(INITIAL_STATUS);
  }
  const sendLoginRequest = (requestBody) => {
    axios
      .post('users/login', requestBody)
      .then((res) => {
        const userData = res.data.data.user;
        setAuth(userData);
        const cookieVal = userData._id;
        setCookie('user', cookieVal, DAYS_TO_EXPIRE);
        setSuccessStatus(setLoginStatus, 'Successfully logged in.')
      })
      .catch((err) => {
        const errorMsgResponse = err.response.data.message || 'Connection error';
        setErrorStatus(setLoginStatus, errorMsgResponse );
      })
  };

  useEffect(() => {
    setRedirectionMessage('');
    setRedirectionError('');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        sendLogoutRequest,
        redirectionMessage,
        setRedirectionMessage,
        redirectionError,
        setRedirectionError,

        sendLoginRequest,
        loginStatus,
        unsetLoginStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

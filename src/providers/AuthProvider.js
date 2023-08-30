import {createContext, useEffect, useState} from 'react';
import axios from 'api/axios';
import {setCookie} from 'utils/cookies';
import providerHelpers from 'utils/providerHelpers';

const AuthContext = createContext({});
const DAYS_TO_EXPIRE = 1;

export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({});
  const [redirectionMessage, setRedirectionMessage] = useState('');
  const [redirectionError, setRedirectionError] = useState('');
  const [authChecked, setAuthChecked] = useState(false);
  const sendLogoutRequest = () => {
    axios
      .get('/users/logout')
      .then(() => {
        setRedirectionMessage('Successfully logged out');
      })
      .catch(() => {
        setRedirectionError('Error occurred while logging out');
      });
    setCookie('user', 'LOGGED_OUT', 1);
    setAuth({});
  };

  const [loginStatus, setLoginStatus] = useState({});
  const unsetLoginStatus = () => {
    setLoginStatus(providerHelpers.INITIAL_STATUS);
  };
  const sendLoginRequest = requestBody => {
    axios
      .post('users/login', requestBody)
      .then(res => {
        const userData = res.data.data.user;
        setAuth(userData);
        const cookieVal = userData._id;
        setCookie('user', cookieVal, DAYS_TO_EXPIRE);
        providerHelpers.setSuccessStatus(setLoginStatus, 'Successfully logged in.');
      })
      .catch(err => {
        const errorMsgResponse = err?.response?.data?.message || 'Connection error';
        providerHelpers.setErrorStatus(setLoginStatus, errorMsgResponse);
      });
  };

  const [signupStatus, setSignupStatus] = useState(providerHelpers.INITIAL_STATUS);
  const unsetSignupStatus = () => {
    setSignupStatus(providerHelpers.INITIAL_STATUS);
  };
  const sendSignupRequest = requestBody => {
    unsetSignupStatus();
    axios
      .post('/users/signup', requestBody)
      .then(res => {
        const userData = res.data.data.user;
        setAuth(userData);
        const cookieVal = userData._id;
        setCookie('user', cookieVal, 1);
        providerHelpers.setSuccessStatus(setSignupStatus, 'User successfully signed up');
      })
      .catch(err => {
        const errorMsgResponse = err?.response?.data?.message || 'Connection error';
        providerHelpers.setErrorStatus(setSignupStatus, errorMsgResponse);
      });
  };

  const [forgotPasswordStatus, setForgotPasswordStatus] = useState(providerHelpers.INITIAL_STATUS);
  const unsetForgotPasswordStatus = () => {
    setForgotPasswordStatus(providerHelpers.INITIAL_STATUS);
  };
  const sendForgotPasswordRequest = requestBody => {
    unsetForgotPasswordStatus();
    axios
      .post('/users/forgotPassword', requestBody)
      .then(res => {
        providerHelpers.setSuccessStatus(setForgotPasswordStatus, 'We have send a link to the provided email.')
      })
      .catch(err => {
        const errorMsgResponse = err?.response?.data?.message || 'Connection error';
        providerHelpers.setErrorStatus(setForgotPasswordStatus, errorMsgResponse);
      });
  };
  const refreshUserData = () => {
    axios
      .get(`/users/me`)
      .then(res => {
        const {user} = res.data.data;
        setAuth(user);
        setAuthChecked(true);
      })
      .catch(() => {
        alert('Connection error. Cannot retrieve data from the server.');
      })
      .finally(() => {
        setAuthChecked(true);
      });
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
        redirectionMessage,
        setRedirectionMessage,
        redirectionError,
        setRedirectionError,

        sendLogoutRequest,

        sendLoginRequest,
        loginStatus,
        unsetLoginStatus,

        sendSignupRequest,
        signupStatus,
        unsetSignupStatus,

        refreshUserData,
        authChecked,
        setAuthChecked,

        sendForgotPasswordRequest,
        forgotPasswordStatus,
        unsetForgotPasswordStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

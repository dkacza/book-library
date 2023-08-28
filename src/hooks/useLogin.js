import { useContext, useEffect, useState } from 'react';
import AuthContext from 'providers/AuthProvider';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

const useLogin = () => {
  const { sendLoginRequest, loginStatus, unsetLoginStatus, setRedirectionMessage, setRedirectionError } =
    useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [navigate, setNavigate] = useState(false);
  const [loginError, setLoginError] = useState({});
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();
  const location = useLocation();

  // Send login request when form is successfully submitted
  const onSubmit = (data) => {
    setIsLoading(true);
    setLoginError({});
    const requestBody = {
      email: data.email,
      password: data.password,
    };
    sendLoginRequest(requestBody);
  };

  // Set an error message when user fills the login form wrong
  const onError = (err) => {
    console.log(err);
    setLoginError({
      ...loginError,
      formError: err,
    });
  };

  // When component mounts:
  // 1. Add the event listener for submitting login with enter key
  // 2. Set focus on email input
  useEffect(() => {
    const listener = (e) => {
      if (e.code !== 'Enter') return;
      e.preventDefault();
      handleSubmit(onSubmit, onError)();
    };
    document.addEventListener('keydown', listener);
    setFocus('email');
    return () => {
      document.removeEventListener('keydown', listener);
      setRedirectionMessage('');
      setRedirectionError('');
    };
  }, []);

  useEffect(() => {
    if (loginStatus.success) {
      setNavigate(true);
      unsetLoginStatus();
      return;
    }
    setLoginError({
      ...loginError,
      dataProviderError: loginStatus.error,
    });
    setIsLoading(false);
  }, [loginStatus]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit, onError)();
  };

  return { handleSubmit, register, handleLoginSubmit, isLoading, loginError, navigate };
};

export default useLogin;

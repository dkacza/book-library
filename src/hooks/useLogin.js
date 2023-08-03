import { useContext, useEffect, useState } from 'react';
import AuthContext from 'providers/AuthProvider';
import { useForm } from 'react-hook-form';
import axios from 'api/axios';
import { setCookie } from 'utils/cookies';

const useLogin = () => {
  const { setAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [navigate, setNavigate] = useState(false);
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    setErrorMessage('');
    axios
      .post('/users/login', {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        const userData = res.data.data.user;
        setAuth(userData);
        const cookieVal = userData._id;
        setCookie('user', cookieVal, 1);
        setErrorMessage('');
        setNavigate(true);
      })
      .catch((err) => {
        const message = err?.response?.data?.message || 'Connection error';
        setErrorMessage(message);
      })
      .finally(() => setIsLoading(false));
  };
  const onError = (err) => {
    setErrorMessage('Email and password are required to sign in');
  };

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
    };
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit, onError)();
  };

  return { handleSubmit, errors, register, handleLoginSubmit, isLoading, errorMessage, navigate };
};

export default useLogin;

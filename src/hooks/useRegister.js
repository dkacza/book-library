import { useContext, useEffect, useState } from 'react';
import AuthContext from 'providers/AuthProvider';
import { useForm } from 'react-hook-form';
import axios from 'api/axios';
import { setCookie } from 'utils/cookies';

const useRegister = () => {
  const { setAuth } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [navigate, setNavigate] = useState(false);
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setErrorMessage('');
    axios
      .post('/users/signup', {
        firstName: data['first-name'],
        lastName: data['last-name'],
        email: data['email'],
        password: data['password'],
        phoneNumber: data['phone'],
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
        const { message } = err?.response?.data;
        setErrorMessage(message);
      });
  };

  const onError = (err) => {
    setErrorMessage('');
    if (err?.agreement) {
      setErrorMessage('You have to accept the terms of service in order to register');
      return;
    }
    for (const [, value] of Object.entries(err)) {
      if (value.type === 'required') {
        setErrorMessage('Please fill all the fields in the form');
        return;
      }
    }
    setErrorMessage('Make sure, that values you have passed are in correct form.');
  };

  useEffect(() => {
    const listener = (e) => {
      if (e.code !== 'Enter') return;
      e.preventDefault();
      handleSubmit(onSubmit, onError)();
    };
    document.addEventListener('keydown', listener);
    setFocus('firstName');
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    return handleSubmit(onSubmit, onError)();
  }

  return {
    register,
    handleRegister,
    errors,
    errorMessage,
    navigate,
  };
};

export default useRegister;

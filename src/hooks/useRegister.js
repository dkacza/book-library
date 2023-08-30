import {useContext, useEffect, useState} from 'react';
import AuthContext from 'providers/AuthProvider';
import {useForm} from 'react-hook-form';

const useRegister = () => {
  const {sendSignupRequest, signupStatus, unsetSignupStatus} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [navigate, setNavigate] = useState(false);
  const [registerError, setRegisterError] = useState({});
  const {register, handleSubmit, setFocus} = useForm();

  // Send signup request when form is successfully submitted
  const onSubmit = data => {
    setIsLoading(true);
    setRegisterError({});
    sendSignupRequest(data);
  };

  // Set an appropriate error message
  const onError = err => {
    console.log(err);
    let formValidationMessage;

    formValidationMessage = 'Make sure, that values you have passed are in correct form.';
    for (const [, value] of Object.entries(err)) {
      if (value.type === 'required') {
        formValidationMessage = 'Please fill all the fields in the form.';
        break;
      }
    }
    if (err?.agreement) {
      formValidationMessage = 'You have to accept the terms of service in order to register.';
    }
    setRegisterError({
      ...registerError,
      formError: err,
      validationMessage: formValidationMessage,
    });
  };

  // If signup status changes, update the error messages and if there is a success, set navigation
  useEffect(() => {
    if (signupStatus.success) {
      setNavigate(true);
      unsetSignupStatus();
      setIsLoading(false);
      return;
    }
    setRegisterError({
      ...registerError,
      dataProviderError: signupStatus.error,
    });
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signupStatus]);

  // Mount event listeners and set focuses
  useEffect(() => {
    const listener = e => {
      if (e.code !== 'Enter') return;
      e.preventDefault();
      handleSubmit(onSubmit, onError)();
    };
    document.addEventListener('keydown', listener);
    setFocus('firstName');
    return () => {
      document.removeEventListener('keydown', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegister = e => {
    e.preventDefault();
    return handleSubmit(onSubmit, onError)();
  };

  return {
    register,
    handleRegister,
    registerError,
    isLoading,
    navigate,
  };
};

export default useRegister;

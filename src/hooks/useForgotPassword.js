import {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import AuthContext from 'providers/AuthProvider';

const EMAIL_TIMEOUT = 4000;

const useForgotPassword = () => {
  const {sendForgotPasswordRequest, unsetForgotPasswordStatus} = useContext(AuthContext);
  const [firstRequestSent, setFirstRequestSent] = useState(false);
  const [emailTimeoutPresent, setEmailTimeoutPresent] = useState(false);
  const {register, handleSubmit} = useForm();
  const [previouslyPassedEmail, setPreviouslyPassedEmail] = useState('');

  const onSubmit = data => {
    if (!data.email || data.email === previouslyPassedEmail) return;
    setFirstRequestSent(true);
    setPreviouslyPassedEmail(data.email);
    setEmailTimeoutPresent(true);
    sendForgotPasswordRequest(data);
    setTimeout(() => {
      setEmailTimeoutPresent(false);
    }, EMAIL_TIMEOUT);
  };
  const submitWithPrevent = e => {
    e.preventDefault();
    handleSubmit(onSubmit)();
  };

  useEffect(() => {
    unsetForgotPasswordStatus();
    return () => {
      unsetForgotPasswordStatus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {firstRequestSent, emailTimeoutPresent, register, submitWithPrevent};
};
export default useForgotPassword;

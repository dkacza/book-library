import {useParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useContext, useEffect, useState} from 'react';
import AuthContext from 'providers/AuthProvider';

const useResetPassword = () => {
  const {token} = useParams();
  const [resetPasswordError, setResetPasswordError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordSuccessfullyReset, setPasswordSuccessfullyReset] = useState(false);
  const {sendResetPasswordRequest, resetPasswordStatus, unsetResetPasswordStatus} =
    useContext(AuthContext);
  const {register, handleSubmit} = useForm();
  const onSubmit = data => {
    setIsLoading(true);
    setResetPasswordError({});
    sendResetPasswordRequest({password: data.newPassword}, token);
  };
  const onError = err => {
    console.log(err);
    setResetPasswordError({
      ...resetPasswordError,
      formError: err,
    });
  };

  const submitWithPrevent = e => {
    e.preventDefault();
    handleSubmit(onSubmit, onError)();
  };

  useEffect(() => {
    if (resetPasswordStatus.success) {
      setPasswordSuccessfullyReset(true);
      unsetResetPasswordStatus();
      setIsLoading(false);
      return;
    }
    setResetPasswordError({
      ...resetPasswordError,
      dataProviderError: resetPasswordStatus.error,
    });
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetPasswordStatus]);

  return {register, submitWithPrevent, resetPasswordError, passwordSuccessfullyReset, isLoading};
};
export default useResetPassword;

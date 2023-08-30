import {useParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useState} from 'react';

const useResetPassword = () => {
  const {token} = useParams();
  const [resetPasswordError, setResetPasswordError] = useState({});
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordAlreadyReset, setPasswordAlreadyReset] = useState(false);

  const {register, handleSubmit} = useForm();
  const onSubmit = (data) => {
    setIsLoading(true);
    setResetPasswordError({});
    console.log('submit');
    setPasswordAlreadyReset(true);
  };
  const onError = (err) => {
    console.log(err);
    setResetPasswordError({
      ...resetPasswordError,
      formError: err,
    })
  };

  const submitWithPrevent = e => {
    e.preventDefault();
    handleSubmit(onSubmit, onError)();
  };

  return {register, submitWithPrevent, resetPasswordSuccess, resetPasswordError, passwordAlreadyReset}
};
export default useResetPassword;

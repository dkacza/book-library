import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'api/axios';
import UsersContext from 'providers/UsersProvider';
import AuthContext from 'providers/AuthProvider';

const useAuthorizationData = () => {
  const {auth ,setAuth} = useContext(AuthContext);
  const [initialLoad, setInitialLoad] = useState(true);
  const [updateSelected, setUpdateSelected] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const {patchCurrentUserAuthenticationData, authenticationSettingsErrorMsg} = useContext(UsersContext)

  const sendPasswordPatch = (data) => {
    axios
      .patch('users/changePassword', data)
      .then((res) => {
        setSuccessMessage('Password has been successfully changed');
        setErrorMessage('');
        reset();
        setUpdateSelected(false);
      })
      .catch((err) => {
        const message = err.response.data.message;
        setErrorMessage(message);
        setSuccessMessage('');
      });
  };

  const handleDiscard = (e) => {
    e.preventDefault();
    reset();
    setUpdateSelected(false);
  };
  const onSubmit = async (data) => {
    sendPasswordPatch(data);
  };
  const onError = (err) => {
    setErrorMessage('Provided passwords are not the same or they are not meeting the requirements');
  };
  const handleSave = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    const formValues = getValues();
    handleSubmit(onSubmit, onError)(formValues);
  };

  useEffect(() => {
    setErrorMessage('');
  }, []);

  // Display success message when password is updated
  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }
    setErrorMessage('');
    setSuccessMessage('Password has been successfully changed');
    reset();
    setUpdateSelected(false);

  }, [auth.passwordChangedAt])

  return {
    updateSelected,
    errors,
    register,
    errorMessage,
    handleSave,
    handleDiscard,
    successMessage,
    setUpdateSelected,
  };
};
export default useAuthorizationData;

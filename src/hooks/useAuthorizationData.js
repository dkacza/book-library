import {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import UsersContext from 'providers/UsersProvider';

const useAuthorizationData = () => {
  const [updateSelected, setUpdateSelected] = useState(false);
  const [authorizationDataError, setAuthorizationDataError] = useState({});
  const [authorizationDataSuccess, setAuthorizationDataSuccess] = useState({});
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: {errors},
  } = useForm();

  const {patchAuthenticationData, authenticationDataStatus, unsetAuthenticationDataStatus} =
    useContext(UsersContext);

  const handleDiscard = e => {
    e.preventDefault();
    reset();
    setUpdateSelected(false);
  };
  const onSubmit = async data => {
    patchAuthenticationData(data);
    reset();
  };
  const onError = err => {
    setAuthorizationDataError({
      ...authorizationDataError,
      formError: err,
    });
  };
  const handleSave = e => {
    e.preventDefault();
    setAuthorizationDataSuccess({});
    setAuthorizationDataError({});
    const formValues = getValues();
    handleSubmit(onSubmit, onError)(formValues);
  };

  // Unset messages when updating is activated
  useEffect(() => {
    if (!updateSelected) {
      return;
    }
    unsetAuthenticationDataStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSelected]);
  // Unset every message on component load
  useEffect(() => {
    unsetAuthenticationDataStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Display success or error message when password request is done
  // Close the update mode if successfully updated the password
  useEffect(() => {
    setAuthorizationDataError({
      formError: errors,
      dataProviderError: authenticationDataStatus?.error,
    });
    setAuthorizationDataSuccess({
      message: authenticationDataStatus?.success,
    });
    if (authenticationDataStatus?.success) {
      reset();
      setUpdateSelected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticationDataStatus]);

  return {
    updateSelected,
    setUpdateSelected,
    register,
    handleSave,
    handleDiscard,
    authorizationDataError,
    authorizationDataSuccess,
  };
};
export default useAuthorizationData;

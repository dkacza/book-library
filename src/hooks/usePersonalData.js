import {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import AuthContext from 'providers/AuthProvider';
import UsersContext from 'providers/UsersProvider';

const usePersonalData = () => {
  const {auth} = useContext(AuthContext);
  const [updateSelected, setUpdateSelected] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: {errors},
  } = useForm();
  const {patchPersonalData, personalDataStatus, unsetPersonalDataStatus} = useContext(UsersContext);
  const [personalDataError, setPersonalDataError] = useState({});
  const [personalDataSuccess, setPersonalDataSuccess] = useState({});

  const setFormValues = () => {
    setValue('firstName', auth.firstName);
    setValue('lastName', auth.lastName);
    setValue('email', auth.email);
    setValue('phoneNumber', auth.phoneNumber);
  };
  const onSubmit = data => {
    patchPersonalData(data);
    reset();
    setUpdateSelected(false);
  };
  const onError = err => {
    setPersonalDataError({
      ...personalDataError,
      formError: err,
    });
  };
  const handleSave = e => {
    e.preventDefault();
    const formData = getValues();
    handleSubmit(onSubmit, onError)(formData);
  };
  const handleDiscard = e => {
    e.preventDefault();
    reset();
    setUpdateSelected(false);
  };

  // Reset the messages when user selects the update
  useEffect(() => {
    reset();
    setFormValues();
    unsetPersonalDataStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSelected]);

  // Set new messages when status from data context changes
  useEffect(() => {
    setPersonalDataError({
      formError: errors,
      dataProviderError: personalDataStatus?.error,
    });
    setPersonalDataSuccess({
      message: personalDataStatus?.success,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personalDataStatus]);

  return {
    updateSelected,
    setUpdateSelected,
    register,
    personalDataError,
    personalDataSuccess,
    handleSave,
    handleDiscard,
  };
};
export default usePersonalData;

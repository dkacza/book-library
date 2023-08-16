import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthContext from 'providers/AuthProvider';
import UsersContext from 'providers/UsersProvider';

const usePersonalData = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [updateSelected, setUpdateSelected] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const { patchCurrentUserPersonalData, personalSettingsErrorMsg } = useContext(UsersContext);

  const setFormValues = () => {
    setValue('firstName', auth.firstName);
    setValue('lastName', auth.lastName);
    setValue('email', auth.email);
    setValue('phoneNumber', auth.phoneNumber);
  }

  const onSubmit = (data) => {
    patchCurrentUserPersonalData(data);
    reset();
    setUpdateSelected(false);
  };
  const onError = (err) => {
    reset();
  };
  const handleSave = (e) => {
    e.preventDefault();
    const formData = getValues();
    handleSubmit(onSubmit, onError)(formData);
    reset();
  };
  const handleDiscard = (e) => {
    e.preventDefault();
    reset();
    setUpdateSelected(false);
  };

  useEffect(() => {
    setFormValues();
  }, [updateSelected])

  return { updateSelected, errors, register, handleSave, handleDiscard, setUpdateSelected };
};
export default usePersonalData;

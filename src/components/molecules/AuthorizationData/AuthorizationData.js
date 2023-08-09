import React, { useEffect, useState } from 'react';
import UserDataLine from 'components/molecules/UserDataLine';
import BorderlessButton from 'components/atoms/BorderlessButton';
import styled from 'styled-components';
import StyledAuthorizationData from 'components/molecules/AuthorizationData/AuthorizationData.styles';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import { ReactComponent as PasswordIcon } from 'assets/icons/lock_FILL0_wght600_GRAD0_opsz48.svg';
import { ReactComponent as PasswordConfirmIcon } from 'assets/icons/task_alt_FILL0_wght600_GRAD0_opsz48.svg';
import { useForm } from 'react-hook-form';
import validationRegexes from 'utils/validationRegexes';
import axios from 'api/axios';

const AuthorizationData = ({ auth, setAuth }) => {
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
  useEffect(() => {
    setErrorMessage('');
  }, []);
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
    console.log(errors);
    setErrorMessage('Provided passwords are not the same or they are not meeting the requirements');
  };
  const handleSave = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    const formValues = getValues();
    handleSubmit(onSubmit, onError)(formValues);
  };
  return (
    <StyledAuthorizationData>
      <UserDataLine data={auth.passwordChangedAt.substring(0, 10)} label={'Last password change date:'} />
      {updateSelected ? (
        <>
          <InputWithIcon
            id="current-password"
            Icon={PasswordIcon}
            placeholder="current password"
            error={errors.currentPassword}
            {...register('currentPassword', {
              required: true,
            })}
          ></InputWithIcon>
          <InputWithIcon
            id="password"
            Icon={PasswordIcon}
            placeholder="new password"
            error={errors.newPassword}
            {...register('newPassword', {
              required: true,
              validate: (val) => validationRegexes.passwordRegex.test(val),
            })}
          ></InputWithIcon>
          <InputWithIcon
            id="password-confirm"
            Icon={PasswordConfirmIcon}
            placeholder="confirm new password"
            error={errors.newPasswordConfirm}
            {...register('newPasswordConfirm', {
              required: true,
              validate: (val, formValues) => val === formValues.newPassword,
            })}
          ></InputWithIcon>
          <p className="password-info">Password should contain at least 8 characters, including letters and digits.</p>
          {errorMessage ? <p className="error-msg">{errorMessage}</p> : ''}

          <BorderlessButton onClick={handleSave}>Submit new password</BorderlessButton>
          <BorderlessButton className="discard" onClick={handleDiscard}>
            Discard
          </BorderlessButton>
        </>
      ) : (
        <>
          {successMessage ? <p className="success-msg">{successMessage}</p> : ''}
          <BorderlessButton onClick={() => setUpdateSelected(true)}>Update password</BorderlessButton>
        </>
      )}
    </StyledAuthorizationData>
  );
};
export default styled(AuthorizationData)``;

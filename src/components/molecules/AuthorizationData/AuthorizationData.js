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
import isEmptyObject from 'utils/isEmptyObject';
import axios from 'api/axios';



const AuthorizationData = ({ auth, setAuth }) => {
  const [updateSelected, setUpdateSelected] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {setPasswordMessage('')}, [])
  const sendPasswordPatch = (data) => {
    axios.patch('users/changePassword', data).then(res => {
      setPasswordMessage('Password has been successfully changed');
    }).catch(err => {
      setPasswordMessage('Wrong current password');
    })
  }

  const handleDiscard = (e) => {
    e.preventDefault();
    reset();
    setUpdateSelected(false);
  };
  const onSubmit = (data) => {
    sendPasswordPatch(data)
    reset();
    setUpdateSelected(false);
  };
  const onError = (err) => {
    console.log(errors);
  };
  const handleSave = (e) => {
    e.preventDefault();
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
          {!isEmptyObject(errors) ? (
            <p className="error-msg">Passwords do not match or they do not meet requirements</p>
          ) : (
            ''
          )}
          <BorderlessButton onClick={handleSave}>Submit new password</BorderlessButton>
          <BorderlessButton className="discard" onClick={handleDiscard}>
            Discard
          </BorderlessButton>
        </>
      ) : (
        <BorderlessButton onClick={() => setUpdateSelected(true)}>Update password</BorderlessButton>
      )}
      {passwordMessage ? <p>{passwordMessage}</p> : ''}
    </StyledAuthorizationData>
  );
};
export default styled(AuthorizationData)``;

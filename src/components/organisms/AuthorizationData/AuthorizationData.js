import React, {useContext} from 'react';
import UserDataLine from 'components/organisms/UserDataLine';
import BorderlessButton from 'components/atoms/BorderlessButton';
import styled from 'styled-components';
import StyledAuthorizationData from 'components/organisms/AuthorizationData/AuthorizationData.styles';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import {ReactComponent as PasswordIcon} from 'assets/icons/lock_FILL0_wght600_GRAD0_opsz48.svg';
import {ReactComponent as PasswordConfirmIcon} from 'assets/icons/task_alt_FILL0_wght600_GRAD0_opsz48.svg';
import validationRegexes from 'utils/validationRegexes';
import useAuthorizationData from 'hooks/useAuthorizationData';
import AuthContext from 'providers/AuthProvider';
import isEmptyObject from 'utils/isEmptyObject';

const AuthorizationData = () => {
  const {auth} = useContext(AuthContext);
  const {
    updateSelected,
    setUpdateSelected,
    register,
    handleSave,
    handleDiscard,
    authorizationDataError,
    authorizationDataSuccess,
  } = useAuthorizationData();

  return (
    <StyledAuthorizationData>
      <UserDataLine
        data={auth?.passwordChangedAt?.substring(0, 10)}
        label={'Last password change date:'}
      />
      {updateSelected ? (
        <>
          <InputWithIcon
            id="current-password"
            Icon={PasswordIcon}
            placeholder="current password"
            error={authorizationDataError?.formError?.currentPassword}
            {...register('currentPassword', {
              required: true,
            })}
          ></InputWithIcon>
          <InputWithIcon
            id="password"
            Icon={PasswordIcon}
            placeholder="new password"
            error={authorizationDataError?.formError?.newPassword}
            {...register('newPassword', {
              required: true,
              validate: val => validationRegexes.passwordRegex.test(val),
            })}
          ></InputWithIcon>
          <InputWithIcon
            id="password-confirm"
            Icon={PasswordConfirmIcon}
            placeholder="confirm new password"
            error={authorizationDataError?.formError?.newPasswordConfirm}
            {...register('newPasswordConfirm', {
              required: true,
              validate: (val, formValues) =>
                val === formValues.newPassword && validationRegexes.passwordRegex.test(val),
            })}
          ></InputWithIcon>
          <p className="password-info">
            Password should contain at least 8 characters, including letters and digits.
          </p>
          {!isEmptyObject(authorizationDataError?.formError) ? (
            <p className="error-msg">Please fill the password inputs correctly</p>
          ) : (
            ''
          )}
          {authorizationDataError?.dataProviderError ? (
            <p className="error-msg">{authorizationDataError?.dataProviderError}</p>
          ) : (
            ''
          )}

          <BorderlessButton onClick={handleSave}>Submit new password</BorderlessButton>
          <BorderlessButton className="discard" onClick={handleDiscard}>
            Discard
          </BorderlessButton>
        </>
      ) : (
        <>
          {authorizationDataSuccess?.message ? (
            <p className="success-msg">{authorizationDataSuccess.message}</p>
          ) : (
            ''
          )}
          <BorderlessButton onClick={() => setUpdateSelected(true)}>
            Update password
          </BorderlessButton>
        </>
      )}
    </StyledAuthorizationData>
  );
};
export default styled(AuthorizationData)``;

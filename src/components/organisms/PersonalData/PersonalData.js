import React, { useContext } from 'react';
import UserDataLine from 'components/organisms/UserDataLine';
import BorderlessButton from 'components/atoms/BorderlessButton';
import StyledPersonalData from 'components/organisms/PersonalData/PersonalData.styles';
import styled from 'styled-components';
import validationRegexes from 'utils/validationRegexes';
import isEmptyObject from 'utils/isEmptyObject';
import AuthContext from 'providers/AuthProvider';
import usePersonalData from 'hooks/usePersonalData';

const PersonalData = () => {
  const { auth } = useContext(AuthContext);
  const {
    updateSelected,
    setUpdateSelected,
    register,
    handleSave,
    handleDiscard,
    personalDataError,
    personalDataSuccess,
  } = usePersonalData();

  return (
    <StyledPersonalData>
      <UserDataLine
        data={auth.firstName}
        label={'Name:'}
        updateSelected={updateSelected}
        placeholder={'first name'}
        fieldName={'firstName'}
        canBeUpdated={true}
        validationFunction={(val) => validationRegexes.nameRegex.test(val) || val === undefined}
        register={register}
        error={personalDataError.formError?.firstName}
      />
      <UserDataLine
        data={auth.lastName}
        label={'Last name:'}
        updateSelected={updateSelected}
        placeholder={'last name'}
        fieldName={'lastName'}
        canBeUpdated={true}
        validationFunction={(val) => validationRegexes.nameRegex.test(val) || val === undefined}
        register={register}
        error={personalDataError.formError?.lastName}
      />
      <UserDataLine
        data={auth.email}
        label={'Email address:'}
        updateSelected={updateSelected}
        placeholder={'email address'}
        fieldName={'email'}
        canBeUpdated={true}
        validationFunction={(val) => validationRegexes.emailRegex.test(val) || val === undefined}
        register={register}
        error={personalDataError.formError?.email}
      />
      <UserDataLine
        data={auth.phoneNumber}
        label={'Phone number:'}
        updateSelected={updateSelected}
        placeholder={'phone number'}
        fieldName={'phoneNumber'}
        canBeUpdated={true}
        validationFunction={(val) => validationRegexes.phoneRegex.test(val) || val === undefined}
        register={register}
        error={personalDataError.formError?.phoneNumber}
      />
      <UserDataLine data={auth.registrationDate.substring(0, 10)} label={'Registration date:'} updateSelected={false} />
      {!isEmptyObject(personalDataError?.formError) ? (
        <p className="error-msg">Please provide the updated data in correct form</p>
      ) : (
        ''
      )}
      {!isEmptyObject(personalDataSuccess) ? <p className="success-msg">{personalDataSuccess.message}</p> : ''}
      {!isEmptyObject(personalDataError?.dataProviderError) ? (
        <p className="error-msg">{personalDataError.dataProviderError}</p>
      ) : (
        ''
      )}

      {updateSelected ? (
        <>
          <BorderlessButton onClick={handleSave}>Save changes</BorderlessButton>
          <BorderlessButton className="discard" onClick={handleDiscard}>
            Discard
          </BorderlessButton>{' '}
        </>
      ) : (
        <BorderlessButton onClick={() => setUpdateSelected(true)}>Change personal data</BorderlessButton>
      )}
    </StyledPersonalData>
  );
};
export default styled(PersonalData)``;

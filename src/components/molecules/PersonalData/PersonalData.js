import React, { useState } from 'react';
import UserDataLine from 'components/molecules/UserDataLine';
import BorderlessButton from 'components/atoms/BorderlessButton';
import StyledPersonalData from 'components/molecules/PersonalData/PersonalData.styles';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import validationRegexes from 'utils/validationRegexes';
import isEmptyObject from 'utils/isEmptyObject';

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
}

const PersonalData = ({ auth }) => {
  const [updateSelected, setUpdateSelected] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm(defaultValues);

  const onSubmit = (data) => {
    console.log('Submission');
    console.log(data);
  };
  const onError = (err) => {
    console.log('Wrong values')
    console.log(errors);
  };
  const handleSave = (e) => {
    e.preventDefault();
    console.log('Save button clicked');
    console.log(errors);
    const formData = getValues();
    console.log(formData);
    handleSubmit(onSubmit, onError)(formData);
  };
  const handleDiscard = (e) => {
    e.preventDefault();
    reset();
    setUpdateSelected(false);
  }
  return (
    <StyledPersonalData>
      <UserDataLine
        data={auth.firstName}
        label={'Name:'}
        updateSelected={updateSelected}
        placeholder={'first name'}
        id={'first-name'}
        canBeUpdated={true}
        validationFunction={(val) => validationRegexes.nameRegex.test(val) || val === undefined}
        register={register}
        error={errors['first-name']}
      />
      <UserDataLine
        data={auth.lastName}
        label={'Last name:'}
        updateSelected={updateSelected}
        placeholder={'last name'}
        id={'last-name'}
        canBeUpdated={true}
        validationFunction={(val) => validationRegexes.nameRegex.test(val) || val === undefined}
        register={register}
        error={errors['last-name']}
      />
      <UserDataLine
        data={auth.email}
        label={'Email address:'}
        updateSelected={updateSelected}
        placeholder={'email address'}
        id={'email'}
        canBeUpdated={true}
        validationFunction={(val) => validationRegexes.emailRegex.test(val) || val === undefined}
        register={register}
        error={errors['email']}
      />
      <UserDataLine
        data={auth.phoneNumber}
        label={'Phone number:'}
        updateSelected={updateSelected}
        placeholder={'phone number'}
        id={'phone-number'}
        canBeUpdated={true}
        validationFunction={(val) => validationRegexes.passwordRegex.test(val) || val === undefined}
        register={register}
        error={errors['phone-number']}
      />
      <UserDataLine
        data={auth.registrationDate.substring(0, 10)}
        label={'Registration date:'}
        updateSelected={updateSelected}
        canBeUpdated={false}
      />
      {!isEmptyObject(errors) ? <p className='error-msg'>Please provide the updated data in correct form</p> : ''}

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

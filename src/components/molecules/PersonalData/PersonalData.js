import React, { useState } from 'react';
import UserDataLine from 'components/molecules/UserDataLine';
import BorderlessButton from 'components/atoms/BorderlessButton';
import StyledPersonalData from 'components/molecules/PersonalData/PersonalData.styles';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const PersonalData = ({ auth }) => {
  const [updateSelected, setUpdateSelected] = useState(false);
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setUpdateSelected(false);
  };
  const onError = (err) => {
    console.log(err);
  };
  const handleSave = (e) => {
    e.preventDefault();
    console.log('Save button clicked');
    handleSubmit(onSubmit, onError);
  };

  return (
    <StyledPersonalData>
      <UserDataLine
        value={auth.firstName}
        label={'Name:'}
        updateSelected={updateSelected}
        register={register}
        placeholder={'first name'}
        canBeUpdated={true}
      />
      <UserDataLine
        value={auth.lastName}
        label={'Last name:'}
        updateSelected={updateSelected}
        register={register}
        placeholder={'last name'}
        canBeUpdated={true}
      />
      <UserDataLine
        value={auth.email}
        label={'Email address:'}
        updateSelected={updateSelected}
        register={register}
        placeholder={'email address'}
        canBeUpdated={true}
      />
      <UserDataLine
        value={auth.phoneNumber}
        label={'Phone number:'}
        updateSelected={updateSelected}
        register={register}
        placeholder={'phone number'}
        canBeUpdated={true}
      />
      <UserDataLine
        value={auth.registrationDate.substring(0, 10)}
        label={'Registration date:'}
        updateSelected={updateSelected}
        canBeUpdated={false}
      />
      {updateSelected ? (
        <>
          <BorderlessButton onClick={handleSave}>Save changes</BorderlessButton>
          <BorderlessButton className="discard" onClick={() => setUpdateSelected(false)}>
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

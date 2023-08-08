import React, { useState } from 'react';
import UserDataLine from 'components/atoms/UserDataLine';
import BorderlessButton from 'components/atoms/BorderlessButton';
import styled from 'styled-components';
import StyledPersonalData from 'components/molecules/PersonalData/PersonalData.styles';

const PersonalData = ({ auth }) => {
  const [updateSelected, setUpdateSelected] = useState(false);

  const toggleUpdateSelected = () => {
    const newVal = !updateSelected;
    setUpdateSelected(newVal);
  };

  return (
    <StyledPersonalData>
      <UserDataLine
        value={auth.firstName + ' ' + auth.lastName}
        label={'Name and surname:'}
        updateSelected={updateSelected}
      />
      <UserDataLine value={auth.email} label={'Email address:'} updateSelected={updateSelected} />
      <UserDataLine value={auth.phoneNumber} label={'Phone number:'} updateSelected={updateSelected} />
      <UserDataLine
        value={auth.registrationDate.substring(0, 10)}
        label={'Registration date:'}
        updateSelected={updateSelected}
      />
      {updateSelected ? (
        <>
          <BorderlessButton onClick={() => setUpdateSelected(false)}>Save changes</BorderlessButton>
          <BorderlessButton className="discard" onClick={() => setUpdateSelected(false)}>Discard</BorderlessButton>{' '}
        </>
      ) : (
        <BorderlessButton onClick={() => setUpdateSelected(true)}>Change personal data</BorderlessButton>
      )}
    </StyledPersonalData>
  );
};
export default styled(PersonalData)``;

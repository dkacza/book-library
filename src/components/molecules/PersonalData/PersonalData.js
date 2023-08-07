import React from 'react';
import UserDataLine from 'components/atoms/UserDataLine';
import BorderlessButton from 'components/atoms/BorderlessButton';
import styled from 'styled-components';
import StyledPersonalData from 'components/molecules/PersonalData/PersonalData.styles';

const PersonalData = ({auth}) => {
  return (
    <StyledPersonalData>
      <UserDataLine value={auth.firstName + ' ' + auth.lastName} label={'Name and surname:'} />
      <UserDataLine value={auth.email} label={'Email address:'} />
      <UserDataLine value={auth.phoneNumber} label={'Phone number:'} />
      <UserDataLine value={auth.registrationDate.substring(0, 10)} label={'Registration date:'} />
      <BorderlessButton>Update personal data</BorderlessButton>
    </StyledPersonalData>
  );
};
export default styled(PersonalData)``;
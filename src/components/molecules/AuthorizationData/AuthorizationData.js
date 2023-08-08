import React from 'react';
import UserDataLine from 'components/molecules/UserDataLine';
import BorderlessButton from 'components/atoms/BorderlessButton';
import styled from 'styled-components';
import StyledAuthorizationData from 'components/molecules/AuthorizationData/AuthorizationData.styles';

const AuthorizationData = ({ auth }) => {
  return (
    <StyledAuthorizationData>
      <UserDataLine data={auth.passwordChangedAt.substring(0, 10)} label={'Last password change date:'} />
      <BorderlessButton>Update password</BorderlessButton>
    </StyledAuthorizationData>
  );
};
export default styled(AuthorizationData)``;
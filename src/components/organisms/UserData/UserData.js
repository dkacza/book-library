import React from 'react';
import Title from 'components/atoms/Title';
import StyledUserData from 'components/organisms/UserData/UserData.styles';
import styled from 'styled-components';

const UserData = ({selectedUser, ...props}) => {
  return (
    <StyledUserData className={props.className}>
      <Title className="user-name">
        {selectedUser.firstName} {selectedUser.lastName}
      </Title>
      <p>{selectedUser.email}</p>
      <p>{selectedUser.phoneNumber}</p>
      {!selectedUser.eligible ? (
        <p className="not-eligible">User is not eligible to rent any more books</p>
      ) : (
        ''
      )}
    </StyledUserData>
  );
};
export default styled(UserData)``;

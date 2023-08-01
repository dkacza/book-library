import React from 'react';
import Title from 'components/atoms/Title';

const UserData = ({selectedUser}) => {
  return (
    <div className="user-data">
      <Title>
        {selectedUser.firstName} {selectedUser.lastName}
      </Title>
      <p>{selectedUser.email}</p>
      <p>{selectedUser.phoneNumber}</p>
    </div>
  );
}
export default UserData;
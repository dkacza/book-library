import React from 'react';
import Title from 'components/atoms/Title';

const UserData = ({selectedUser}) => {
  console.log(selectedUser)
  return (
    <div className="user-data">
      <Title className="title">
        {selectedUser.firstName} {selectedUser.lastName}
      </Title>
      <p>{selectedUser.email}</p>
      <p>{selectedUser.phoneNumber}</p>
      {selectedUser.eligible === false ? <p className="not-eligible">User is not eligible to rent any more books</p> : ''}
    </div>
  );
}
export default UserData;
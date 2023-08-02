import React, { useState } from 'react';
import StyledBorrowingsManager from 'components/templates/BorrowingsManager/BorrowingsManager.styles';
import UserSelection from 'components/organisms/UserSelection/UserSelection';
import BorrowingActions from 'components/organisms/BorrowingActions/BorrowingActions';

const BorrowingsManager = () => {
  const [selectedUser, setSelectedUser] = useState();
  const handleUserUnset = (e) => {
    e.preventDefault();
    setSelectedUser(undefined);
  }

  return (
    <StyledBorrowingsManager className="borrowings-manager">
      {selectedUser ? (
        <BorrowingActions selectedUser={selectedUser} setSelectedUser={setSelectedUser} handleUserUnset={handleUserUnset} />
      ) : (
        <UserSelection setSelectedUser={setSelectedUser} />
      )}
    </StyledBorrowingsManager>
  );
};

export default BorrowingsManager;

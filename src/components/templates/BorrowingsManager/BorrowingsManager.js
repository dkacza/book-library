import React, { useState } from 'react';
import StyledBorrowingsManager from 'components/templates/BorrowingsManager/BorrowingsManager.styles';
import UserSelection from 'components/organisms/UserSelection/UserSelection';
import BookBorrowing from 'components/organisms/BookBorrowing/BookBorrowing';

const BorrowingsManager = () => {
  const [selectedUser, setSelectedUser] = useState();
  const handleUserDelete = (e) => {
    e.preventDefault();
    setSelectedUser(undefined);
  }

  return (
    <StyledBorrowingsManager className="borrowings-manager">
      {selectedUser ? (
        <BookBorrowing selectedUser={selectedUser} handleUserDelete={handleUserDelete} />
      ) : (
        <UserSelection setSelectedUser={setSelectedUser} />
      )}
    </StyledBorrowingsManager>
  );
};

export default BorrowingsManager;

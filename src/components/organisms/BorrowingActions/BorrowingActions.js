import React from 'react';

import UserData from 'components/molecules/UserData/UserData';
import Captions from 'components/molecules/Captions/Captions';
import Returns from 'components/organisms/BorrowingActions/Returns/Returns';
import Borrowings from 'components/organisms/BorrowingActions/Borrowings/Borrowings';
import useBorrowingManager from 'hooks/useBorrowingManager';
import StyledBorrowingActions from 'components/organisms/BorrowingActions/BorrowingAction.styles';
import BorderlessButton from 'components/atoms/BorderlessButton';

const BorrowingActions = ({ selectedUser, setSelectedUser, handleUserUnset }) => {
  const {
    books,
    currentBorrowings,
    toggleAction,
    handleBookBorrow,
    handleBookReturn,
    bookSearchQuery,
    handleQueryChange,
    returnSelected,
  } = useBorrowingManager(selectedUser, setSelectedUser);

  return (
    <StyledBorrowingActions className="borrowing-actions">
      <UserData selectedUser={selectedUser} />
      <BorderlessButton className="unset-user" onClick={handleUserUnset}>
        Select another user
      </BorderlessButton>
      <div className="management">
        <Captions toggleAction={toggleAction} returnSelected={returnSelected} />
        <div className="content">
          {returnSelected ? (
            <Returns currentBorrowings={currentBorrowings} handleBookReturn={handleBookReturn} />
          ) : (
            <Borrowings
              handleQueryChange={handleQueryChange}
              bookSearchQuery={bookSearchQuery}
              books={books}
              handleBookBorrow={handleBookBorrow}
            />
          )}
        </div>
      </div>
    </StyledBorrowingActions>
  );
};

export default BorrowingActions;
import React from 'react';

import UserData from 'components/molecules/UserData/UserData';
import Captions from 'components/molecules/Captions/Captions';
import Returns from 'components/organisms/Returns/Returns';
import Borrowings from 'components/organisms/Borrowings/Borrowings';
import useBorrowingManager from 'hooks/useBorrowingManager';
import StyledBorrowingActions from 'components/organisms-groups/BorrowingActions/BorrowingAction.styles';
import BorderlessButton from 'components/atoms/BorderlessButton';

const BorrowingActions = ({ selectedUser, setSelectedUser, handleUserUnset }) => {
  const {
    booksSearchResult,
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
        {returnSelected ? (
          <Returns currentBorrowings={currentBorrowings} handleBookReturn={handleBookReturn} />
        ) : (
          <Borrowings
            handleQueryChange={handleQueryChange}
            bookSearchQuery={bookSearchQuery}
            booksSearchResult={booksSearchResult}
            handleBookBorrow={handleBookBorrow}
          />
        )}
      </div>
    </StyledBorrowingActions>
  );
};

export default BorrowingActions;

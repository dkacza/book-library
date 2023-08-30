import React from 'react';

import UserData from 'components/organisms/UserData/UserData';
import Captions from 'components/molecules/Captions/Captions';
import Returns from 'components/organisms/Returns/Returns';
import Borrowings from 'components/organisms/Borrowings/Borrowings';
import useBorrowingManager from 'hooks/useBorrowingManager';
import StyledBorrowingActions from 'components/organisms-groups/BorrowingActions/BorrowingAction.styles';
import BorderlessButton from 'components/atoms/BorderlessButton';
import FloatingMessage from 'components/molecules/FloatingMessage/FloatingMessage';

const BorrowingActions = ({selectedUser, setSelectedUser, handleUserUnset}) => {
  const {
    booksSearchResult,
    currentBorrowings,
    toggleAction,
    handleBookBorrow,
    handleBookReturn,
    bookSearchQuery,
    handleQueryChange,
    returnSelected,
    borrowingManagerError,
    borrowingManagerSuccess,
  } = useBorrowingManager(selectedUser, setSelectedUser);

  return (
    <StyledBorrowingActions className="borrowing-actions">
      <UserData selectedUser={selectedUser} />
      <BorderlessButton className="unset-user" onClick={handleUserUnset}>
        Select another user
      </BorderlessButton>
      <div className="management">
        <Captions toggleAction={toggleAction} returnSelected={returnSelected} />

        <div className="action-container">
          {returnSelected ? (
            <Returns currentBorrowings={currentBorrowings} handleBookReturn={handleBookReturn} />
          ) : (
            <Borrowings
              handleQueryChange={handleQueryChange}
              bookSearchQuery={bookSearchQuery}
              booksSearchResult={booksSearchResult}
              handleBookBorrow={handleBookBorrow}
              eligible={selectedUser.eligible}
            />
          )}
        </div>
      </div>
      {borrowingManagerError ? <FloatingMessage error={borrowingManagerError} /> : ''}
      {borrowingManagerSuccess ? <FloatingMessage success={borrowingManagerSuccess} /> : ''}
    </StyledBorrowingActions>
  );
};

export default BorrowingActions;

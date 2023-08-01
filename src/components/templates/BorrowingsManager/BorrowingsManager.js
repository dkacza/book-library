import React, { useState } from 'react';
import StyledSection from 'components/templates/BorrowingsManager/BorrowingsManager.styles';
import UserSelection from 'components/organisms/UserSelection/UserSelection';

const BorrowingsManager = () => {
  const [selectedUser, setSelectedUser] = useState();

  return (
    <StyledSection className="wrapper">
      {!selectedUser ? <UserSelection setSelectedUser={setSelectedUser} /> : <div>USER SELECTED</div>}
    </StyledSection>
  );
};

export default BorrowingsManager;

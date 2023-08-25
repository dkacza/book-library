import { MainViewTemplate } from 'views/MainViews/MainViewTemplate';
import Navigation from 'components/organisms/Navigation/Navigation';
import Title from 'components/atoms/Title';
import BorrowingActions from 'components/organisms-groups/BorrowingActions/BorrowingActions';
import UserSelection from 'components/organisms/UserSelection/UserSelection';
import React, { useState } from 'react';
import StyledContentSection from 'views/MainViews/ManageBorrowingsView/ManageBorrowingsView.styles';

const ManageBorrowings = () => {
  const [selectedUser, setSelectedUser] = useState();
  const handleUserUnset = (e) => {
    e.preventDefault();
    setSelectedUser(undefined);
  };

  return (
    <MainViewTemplate>
      <Navigation />
      <main>
        <Title>Manage Borrowings</Title>
        <StyledContentSection>
          {selectedUser ? (
            <BorrowingActions
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              handleUserUnset={handleUserUnset}
            />
          ) : (
            <UserSelection setSelectedUser={setSelectedUser} />
          )}
        </StyledContentSection>
        {}
      </main>
    </MainViewTemplate>
  );
};
export default ManageBorrowings;

import {MainViewTemplate} from 'views/MainViews/MainViewTemplate';
import Navigation from 'components/organisms/Navigation/Navigation';
import Title from 'components/atoms/Title';
import useUsers from 'hooks/useUsers';
import Table from 'components/organisms/Table/Table';
import Pagination from 'components/molecules/Pagination/Pagination';
import UserFilters from 'components/organisms/UserFilters/UserFilters';
import TableViewTemplate from 'views/MainViews/TableViewTemplate';
import React from 'react';
import FloatingErrorMessage from 'components/molecules/FloatingMessage/FloatingMessage';

const columnNames = ['Full name', 'Email address', 'Registration', 'Role', 'Eligible'];
const columnCodes = ['fullName', 'email', 'registrationDate', 'role', 'eligible'];
const columnProportions = [0.3, 0.3, 0.2, 0.1, 0.1];

const UsersView = () => {
  const {
    users,
    paginationData,
    register,
    handlePageChange,
    handleClearFields,
    handleRecordSelect,
    submitWithPrevent,
    userListError,
  } = useUsers();

  return (
    <MainViewTemplate>
      <Navigation />
      <main>
        <Title>Users</Title>
        <TableViewTemplate>
          {users.length > 0 ? (
            <Table
              data={users}
              columnNames={columnNames}
              columnCodes={columnCodes}
              columnproportions={columnProportions}
              actionOnSelect={handleRecordSelect}
            />
          ) : (
            <p className="empty-data-error-msg">No users matching current criteria found</p>
          )}

          <UserFilters
            onSubmit={e => submitWithPrevent(e)}
            register={register}
            errors={userListError?.formError}
            handleClearFields={handleClearFields}
          />
          {users.length > 0 ? (
            <Pagination paginationData={paginationData} handlePageChange={handlePageChange} />
          ) : (
            ''
          )}
        </TableViewTemplate>
        {userListError?.dataProviderError ? (
          <FloatingErrorMessage error={userListError.dataProviderError} />
        ) : (
          ''
        )}
      </main>
    </MainViewTemplate>
  );
};
export default UsersView;

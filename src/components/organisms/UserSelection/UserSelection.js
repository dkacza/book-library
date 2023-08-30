import React from 'react';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import {ReactComponent as SearchIcon} from 'assets/icons/search_FILL0_wght600_GRAD0_opsz48.svg';
import StyledUserSelection from 'components/organisms/UserSelection/UserSelection.styles';
import styled from 'styled-components';
import useUserSelection from 'hooks/useUserSelection';
import Table from 'components/organisms/Table/Table';
import Pagination from 'components/molecules/Pagination/Pagination';

const columnNames = ['First name', 'Last name', 'Email address', 'Phone number'];
const columnCodes = ['firstName', 'lastName', 'email', 'phoneNumber'];
const columnProportions = [0.2, 0.3, 0.3, 0.2];

const UserSelection = ({setSelectedUser}) => {
  const {
    searchQuery,
    users,
    handleUserSelect,
    handleQueryChange,
    paginationData,
    handlePageChange,
  } = useUserSelection(setSelectedUser);

  return (
    <StyledUserSelection>
      <InputWithIcon
        placeholder={'search'}
        name={'user-search'}
        id={'user-search'}
        type={'text'}
        Icon={SearchIcon}
        value={searchQuery}
        onChange={handleQueryChange}
      />
      <p className="tip">
        Start with selecting a user. Then you will be able to perform borrowing management actions.
      </p>
      {users.length > 0 ? (
        <Table
          data={users}
          columnNames={columnNames}
          columnCodes={columnCodes}
          columnproportions={columnProportions}
          actionOnSelect={handleUserSelect}
        />
      ) : (
        <p className="empty-data-error-msg">No users found</p>
      )}
      {users.length > 0 ? (
        <Pagination paginationData={paginationData} handlePageChange={handlePageChange} />
      ) : (
        ''
      )}
    </StyledUserSelection>
  );
};
export default styled(UserSelection)``;

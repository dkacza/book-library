import React, { useState } from 'react';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import { ReactComponent as SearchIcon } from 'assets/icons/search_FILL0_wght600_GRAD0_opsz48.svg';
import axios from 'api/axios';
import useDebounce from 'hooks/useDebounce';
import StyledUserSelection from 'components/organisms/UserSelection/UserSelection.styles';
import styled from 'styled-components';

const API_CALL_DELAY = 600;

const UserSelection = ({ setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const getUsers = () => {
    if (searchQuery === '') return;
    axios
      .get(`/users?role=user&search=${searchQuery}`)
      .then((res) => {
        const usersResponse = res.data.data.users || [];
        setUsers(usersResponse);
      })
      .catch((err) => console.log(err));
  };
  useDebounce(getUsers, API_CALL_DELAY, [searchQuery]);
  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') setUsers([]);
  };

  const handleUserSelect = (e) => {
    const { id } = e.currentTarget;
    const selectedUser = users.find((user) => user._id === id);
    setSelectedUser(selectedUser);
  };

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
      <ul className="user-list">
        {users.length > 0 ? (
          users.map((user) => (
            <li className="user-entry" key={user._id} id={user._id} onClick={handleUserSelect}>
              <p className="first-name">{user.firstName}</p>
              <p className="last-name">{user.lastName}</p>
              <p className="email">{user.email}</p>
            </li>
          ))
        ) : (
          <p className="search-info">Search for users to get started...</p>
        )}
      </ul>
    </StyledUserSelection>
  );
};
export default styled(UserSelection)``;

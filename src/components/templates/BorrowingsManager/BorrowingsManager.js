import React, { useState } from 'react';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import { ReactComponent as SearchIcon } from 'assets/icons/search_FILL0_wght600_GRAD0_opsz48.svg';
import useDebounce from 'hooks/useDebounce';

const API_CALL_DELAY = 1000;

const BorrowingsManager = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('abc');

  const getUsers = () => {
    console.log('getting users data');
  };

  useDebounce(getUsers, API_CALL_DELAY, [searchQuery]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    console.log(searchQuery);
  };

  return (
    <section className="wrapper">
      <div className="user-search">
        <p className="search-info">Search for user to get started</p>
        <InputWithIcon
          placeholder={'name, email, phone...'}
          name={'user-search'}
          id={'user-search'}
          type={'text'}
          Icon={SearchIcon}
          value={searchQuery}
          onChange={handleChange}
        ></InputWithIcon>
      </div>

      <div className="user-list">
        <p>Results: </p>
      </div>
    </section>
  );
};

export default BorrowingsManager;

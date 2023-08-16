import { useContext, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import UsersContext from 'providers/UsersProvider';

const API_CALL_DELAY = 600;

const useUserSelection = (setSelectedUser) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { searchUsers, searchUsersErrorMsg, searchUsersConfirmationMsg } = useContext(UsersContext);

  const getUsersFromProvider = () => {
    if (searchQuery === '') return;
    (async () => {
      const foundUsers = await searchUsers(searchQuery);
      setUsers(foundUsers);
    })();
  };

  useDebounce(getUsersFromProvider, API_CALL_DELAY, [searchQuery]);
  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') setUsers([]);
  };

  const handleUserSelect = (e) => {
    const { id } = e.currentTarget;
    const selectedUser = users.find((user) => user._id === id);
    setSelectedUser(selectedUser);
  };

  return { searchQuery, users, handleUserSelect, handleQueryChange };
};
export default useUserSelection;

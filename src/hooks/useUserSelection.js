import { useContext } from 'react';
import useDebounce from 'hooks/useDebounce';
import UsersContext from 'providers/UsersProvider';

const API_CALL_DELAY = 600;

const useUserSelection = (setSelectedUser) => {
  const { fetchAllUsers, setUsersQuery, usersQuery, users, paginationData, setCurrentPage } = useContext(UsersContext);

  const getUsersFromProvider = () => {
    fetchAllUsers();
  };

  useDebounce(getUsersFromProvider, API_CALL_DELAY, [usersQuery]);
  const handleQueryChange = (e) => {
    let query = ``;
    if (e.target.value) {
      query = `search=${e.target.value}`;
    }
    setUsersQuery(query);
  };
  const handlePageChange = (newPage) => {
    if (newPage > paginationData.totalPages || newPage < 1) return;
    setCurrentPage(newPage);
  };

  const handleUserSelect = (e) => {
    const { id } = e.currentTarget;
    const selectedUser = users.find((user) => user._id === id);
    setSelectedUser(selectedUser);
  };

  return { usersQuery, users, handleUserSelect, handleQueryChange, paginationData, handlePageChange, setCurrentPage };
};
export default useUserSelection;

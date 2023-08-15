import { createContext, useContext, useEffect, useState } from 'react';
import useWindowDimensions from 'hooks/useWindowDimensions';
import axios from 'api/axios';
import AuthContext from 'providers/AuthProvider';

const UsersContext = createContext({});

const INITIAL_USER_PAGE = 1;
const LIMIT_1080P = 10;
const LIMIT_1440P = 15;
const LIMIT_4K = 20;

const processUser = (user) => {
  user.fullName = user.firstName + ' ' + user.lastName;
  return user;
}

export const UsersProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [usersQuery, setUsersQuery] = useState('');
  const [paginationData, setPaginationData] = useState({});
  const [currentPage, setCurrentPage] = useState(INITIAL_USER_PAGE);
  const [errorMsg, setErrorMsg] = useState('');
  const [limitPerPage, setLimitPerPage] = useState(LIMIT_1080P);
  const { width, height } = useWindowDimensions();



  const fetchAllUsers = (page) => {
    axios
      .get(`users/?page=${page}&limit=${limitPerPage}&${usersQuery}`)
      .then((res) => {
        const usersResponse = res.data.data.users;
        setUsers(usersResponse.map(processUser));

        const paginationResponse = res.data.data.pagination;
        setPaginationData(paginationResponse);
      })
      .catch((err) => {
        const errorMsgResponse = err.res.data.message;
        setErrorMsg(errorMsgResponse);
      });
  };

  // Set limit per page on render and widow resize
  useEffect(() => {
    if (width <= 2000) setLimitPerPage(LIMIT_1080P);
    if (width > 2000) setLimitPerPage(LIMIT_1440P);
    if (width > 2600) setLimitPerPage(LIMIT_4K);
  }, [width, height]);

  useEffect(() => {
    setCurrentPage(INITIAL_USER_PAGE);
  }, [usersQuery]);

  useEffect(() => {
    if (!(auth.role === 'admin' || auth.role === 'librarian')) return;
    fetchAllUsers(currentPage);
  }, [auth, limitPerPage, usersQuery, currentPage]);

  return (
    <UsersContext.Provider
      value={{
        users,
        currentPage,
        paginationData,
        errorMsg,
        setUsersQuery,
        setCurrentPage,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;

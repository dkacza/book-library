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
  user.registrationDate = user.registrationDate.split('T')[0];
  return user;
};

const INITIAL_STATUS = {
  error: '',
  confirm: '',
};

const setSuccessStatus = (setter, message) => {
  setter({
    error: '',
    success: message,
  });
};
const setErrorStatus = (setter, message) => {
  setter({
    error: message,
    success: '',
  });
};

export const UsersProvider = ({ children }) => {
  const { auth, setAuth } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [usersQuery, setUsersQuery] = useState('');
  const [paginationData, setPaginationData] = useState({});
  const [currentPage, setCurrentPage] = useState(INITIAL_USER_PAGE);
  const [limitPerPage, setLimitPerPage] = useState(LIMIT_1080P);
  const { width, height } = useWindowDimensions();

  const [allUsersStatus, setAllUsersStatus] = useState(INITIAL_STATUS);
  const fetchAllUsers = (page) => {
    setAllUsersStatus(INITIAL_STATUS);
    axios
      .get(`users/?page=${page}&limit=${limitPerPage}&${usersQuery}`)
      .then((res) => {
        const usersResponse = res.data.data.users;
        setUsers(usersResponse.map(processUser));

        const paginationResponse = res.data.data.pagination;
        setPaginationData(paginationResponse);

        setSuccessStatus(setAllUsersStatus, 'Successfully fetched users');
      })
      .catch((err) => {
        const errorMsgResponse = err?.response?.data?.message;
        setErrorStatus(setAllUsersStatus, errorMsgResponse);
      });
  };

  const [userByIdStatus, setUserByIdStatus] = useState(INITIAL_STATUS);
  const getUserById = async (id) => {
    setUserByIdStatus(INITIAL_STATUS);
    let user = users.find((user) => user._id === id);
    if (user) {
      setSuccessStatus(setUserByIdStatus, 'User successfully selected');
      return user;
    }

    try {
      const userResponse = await axios.get(`users/${id}`);
      setSuccessStatus(setUserByIdStatus, 'User successfully fetched');
      return processUser(userResponse.data.data.user);
    } catch (err) {
      const errorMsgResponse = err.response.data.message;
      setErrorStatus(setUserByIdStatus, errorMsgResponse);
      return {};
    }
  };

  const [personalDataStatus, setPersonalDataStatus] = useState(INITIAL_STATUS);
  const patchPersonalData = (requestBody) => {
    unsetPersonalDataStatus();
    axios
      .patch(`users/me`, requestBody)
      .then((res) => {
        const updatedUserResponse = res.data.data.user;
        setAuth(processUser(updatedUserResponse));
        setSuccessStatus(setPersonalDataStatus, 'Successfully updated users data');
      })
      .catch((err) => {
        const errorMsgResponse = err.response.data.message;
        setErrorStatus(setPersonalDataStatus, errorMsgResponse);
      });
  };
  const unsetPersonalDataStatus = () => {
    setPersonalDataStatus(INITIAL_STATUS);
  };

  const [authenticationDataStatus, setAuthenticationDataStatus] = useState(INITIAL_STATUS);
  const patchAuthenticationData = (requestBody) => {
    setAuthenticationDataStatus(INITIAL_STATUS);
    axios
      .patch('users/changePassword', requestBody)
      .then((res) => {
        const updatedUserResponse = res.data.data.user;
        setAuth(processUser(updatedUserResponse));
        setSuccessStatus(setAuthenticationDataStatus, 'Users authentication data successfully patched');
      })
      .catch((err) => {
        const errorMsgResponse = err.response.data.message;
        setErrorStatus(setAuthenticationDataStatus, errorMsgResponse);
      });
  };
  const unsetAuthenticationDataStatus = () => {
    setAuthenticationDataStatus(INITIAL_STATUS);
  };

  const [roleStatus, setRoleStatus] = useState(INITIAL_STATUS);
  const patchRole = (id, requestBody) => {
    unsetRoleStatus();
    axios
      .patch(`users/promote/${id}`, requestBody)
      .then((res) => {
        const updatedUserResponse = res.data.user;
        const updatedUsers = [...users];
        for (let i = 0; i < updatedUsers.length; i++) {
          if (updatedUsers[i]._id === id) {
            updatedUsers[i] = processUser(updatedUserResponse);
          }
        }
        setUsers(updatedUsers);
        setSuccessStatus(setRoleStatus, 'User successfully promoted');
      })
      .catch((err) => {
        const errorMsgResponse = err.response.data.message;
        setErrorStatus(setRoleStatus, errorMsgResponse);
      });
  };
  const unsetRoleStatus = () => {
    setRoleStatus(INITIAL_STATUS);
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
        currentPage,
        paginationData,
        setUsersQuery,
        setCurrentPage,
        users,
        allUsersStatus,
        userByIdStatus,
        getUserById,
        personalDataStatus,
        unsetPersonalDataStatus,
        patchPersonalData,
        authenticationDataStatus,
        patchAuthenticationData,
        unsetAuthenticationDataStatus,
        roleStatus,
        patchRole,
        unsetRoleStatus,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;

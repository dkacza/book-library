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
};

export const UsersProvider = ({ children }) => {
  const { auth, setAuth } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [usersQuery, setUsersQuery] = useState('');
  const [paginationData, setPaginationData] = useState({});
  const [currentPage, setCurrentPage] = useState(INITIAL_USER_PAGE);

  const [fetchAllUsersErrorMsg, setFetchAllUsersErrorMsg] = useState('');
  const [fetchAllUsersConfirmationMsg, setFetchAllUsersConfirmationMsg] = useState('');

  const [getUserByIdErrorMsg, setGetUserByIdErrorMsg] = useState('');
  const [getUserByIdConfirmationMsg, setGetUserByIdConfirmationMsg] = useState('');

  const [patchPersonalDataErrorMsg, setPatchPersonalDataErrorMsg] = useState('');
  const [patchPersonalDataConfirmationMsg, setPatchPersonalDataConfirmationMsg] = useState('');

  const [patchAuthenticationDataErrorMsg, setPatchAuthenticationDataErrorMsg] = useState('');
  const [patchAuthenticationDataConfirmationMsg, setPatchAuthenticationDataConfirmationMsg] = useState('');

  const [patchRoleErrorMsg, setPatchRoleErrorMsg] = useState('');
  const [patchRoleConfirmationMsg, setPatchRoleConfirmationMsg] = useState('');

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

        setFetchAllUsersConfirmationMsg('Users successfully fetched');
      })
      .catch((err) => {
        const errorMsgResponse = err.res.data.message;
        setFetchAllUsersErrorMsg(errorMsgResponse);
      });
  };

  const getUserById = async (id) => {
    let user = users.find((user) => user._id === id);
    if (user) {
      setGetUserByIdConfirmationMsg('User successfully selected');
      return user;
    }

    try {
      const userResponse = await axios.get(`users/${id}`);
      setGetUserByIdConfirmationMsg('User successfully fetched');
      return processUser(userResponse.data.data.user);
    } catch (err) {
      const errorMsgResponse = err.res.data.message;
      setGetUserByIdErrorMsg(errorMsgResponse);
      return {};
    }
  };

  const patchPersonalData = (requestBody) => {
    axios
      .patch(`users/me`, requestBody)
      .then((res) => {
        const updatedUserResponse = res.data.data.user;
        setAuth(processUser(updatedUserResponse));
        setPatchPersonalDataConfirmationMsg('Users personal data successfully patched');
      })
      .catch((err) => {
        const errorMsgResponse = err.res.data.message;
        setPatchPersonalDataErrorMsg(errorMsgResponse);
      });
  };
  const patchAuthenticationData = (requestBody) => {
    axios
      .patch('users/changePassword', requestBody)
      .then((res) => {
        const updatedUserResponse = res.data.data.user;
        setAuth(processUser(updatedUserResponse));
        setPatchAuthenticationDataConfirmationMsg('Users authentication data successfully patched');
      })
      .catch((err) => {
        const errorMsgResponse = err.res.data.message;
        setPatchAuthenticationDataErrorMsg(errorMsgResponse);
      });
  };

  const patchRole = (id, requestBody) => {
    axios
      .patch(`users/promote/${id}`, requestBody)
      .then((res) => {
        const updatedUserResponse = res.data.user;
        const updatedUsers = [...users];
        for (let i = 0; i < updatedUsers.length; i++) {
          if (updatedUsers[i]._id === id) {
            updatedUsers[i] = processUser(updatedUserResponse);
            console.log('user found and updated');
          }
        }
        setUsers(updatedUsers);
        setPatchRoleConfirmationMsg('User successfully promoted');
      })
      .catch((err) => {
        const errorMsgResponse = err.response.data.message;
        setPatchRoleErrorMsg(errorMsgResponse);
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
        usersListErrorMsg: fetchAllUsersErrorMsg,
        personalSettingsErrorMsg: patchPersonalDataErrorMsg,
        authenticationSettingsErrorMsg: patchAuthenticationDataErrorMsg,
        setUsersQuery,
        setCurrentPage,
        patchCurrentUserPersonalData: patchPersonalData,
        patchCurrentUserAuthenticationData: patchAuthenticationData,

        getUserById,
        getUserByIdConfirmationMsg,
        getUserByIdErrorMsg,

        patchRole,
        patchRoleConfirmationMsg,
        patchRoleErrorMsg,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;

import {createContext, useContext, useEffect, useState} from 'react';
import useWindowDimensions from 'hooks/useWindowDimensions';
import axios from 'api/axios';
import AuthContext from 'providers/AuthProvider';
import providerHelpers from 'utils/providerHelpers';

const UsersContext = createContext({});

const INITIAL_USER_PAGE = 1;
const LIMIT_1080P = 10;
const LIMIT_1440P = 15;
const LIMIT_4K = 20;

const processUser = user => {
  user.fullName = user.firstName + ' ' + user.lastName;
  user.registrationDate = user.registrationDate.split('T')[0];
  return user;
};

export const UsersProvider = ({children}) => {
  const {auth, setAuth} = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [usersQuery, setUsersQuery] = useState('');
  const [paginationData, setPaginationData] = useState({});
  const [currentPage, setCurrentPage] = useState(INITIAL_USER_PAGE);
  const [limitPerPage, setLimitPerPage] = useState(LIMIT_1080P);
  const {width, height} = useWindowDimensions();

  const [allUsersStatus, setAllUsersStatus] = useState(providerHelpers.INITIAL_STATUS);
  const unsetAllUsersStatus = () => {
    setAllUsersStatus(providerHelpers.INITIAL_STATUS);
  };
  const fetchAllUsers = page => {
    unsetAllUsersStatus();
    axios
      .get(`users/?page=${page}&limit=${limitPerPage}&${usersQuery}`)
      .then(res => {
        const usersResponse = res.data.data.users;
        setUsers(usersResponse.map(processUser));

        const paginationResponse = res.data.data.pagination;
        setPaginationData(paginationResponse);

        providerHelpers.setSuccessStatus(setAllUsersStatus, 'Successfully fetched users');
      })
      .catch(err => {
        const errorMsgResponse = err?.response?.data?.message || 'Connection error';
        providerHelpers.setErrorStatus(setAllUsersStatus, errorMsgResponse);
        setUsers([]);
      });
  };

  const [userByIdStatus, setUserByIdStatus] = useState(providerHelpers.INITIAL_STATUS);
  const unsetUserByIdStatus = () => {
    setUserByIdStatus(providerHelpers.INITIAL_STATUS);
  };
  const getUserById = async id => {
    unsetUserByIdStatus();
    let user = users.find(user => user._id === id);
    if (user) {
      providerHelpers.setSuccessStatus(setUserByIdStatus, 'User successfully selected');
      return user;
    }
    try {
      const userResponse = await axios.get(`users/${id}`);
      providerHelpers.setSuccessStatus(setUserByIdStatus, 'User successfully fetched');
      return processUser(userResponse.data.data.user);
    } catch (err) {
      const errorMsgResponse = err?.response?.data?.message || 'Connection error';
      providerHelpers.setErrorStatus(setUserByIdStatus, errorMsgResponse);
      return {};
    }
  };

  const [personalDataStatus, setPersonalDataStatus] = useState(providerHelpers.INITIAL_STATUS);
  const unsetPersonalDataStatus = () => {
    setPersonalDataStatus(providerHelpers.INITIAL_STATUS);
  };
  const patchPersonalData = requestBody => {
    unsetPersonalDataStatus();
    axios
      .patch(`users/me`, requestBody)
      .then(res => {
        const updatedUserResponse = res.data.data.user;
        setAuth(processUser(updatedUserResponse));
        providerHelpers.setSuccessStatus(setPersonalDataStatus, 'Successfully updated users data');
      })
      .catch(err => {
        const errorMsgResponse = err?.response?.data?.message || 'Connection error';
        providerHelpers.setErrorStatus(setPersonalDataStatus, errorMsgResponse);
      });
  };

  const [authenticationDataStatus, setAuthenticationDataStatus] = useState(
    providerHelpers.INITIAL_STATUS,
  );
  const unsetAuthenticationDataStatus = () => {
    setAuthenticationDataStatus(providerHelpers.INITIAL_STATUS);
  };
  const patchAuthenticationData = requestBody => {
    setAuthenticationDataStatus(providerHelpers.INITIAL_STATUS);
    axios
      .patch('users/changePassword', requestBody)
      .then(res => {
        const updatedUserResponse = res.data.data.user;
        setAuth(processUser(updatedUserResponse));
        providerHelpers.setSuccessStatus(
          setAuthenticationDataStatus,
          'Users authentication data successfully patched',
        );
      })
      .catch(err => {
        const errorMsgResponse = err?.response?.data?.message || 'Connection error';
        providerHelpers.setErrorStatus(setAuthenticationDataStatus, errorMsgResponse);
      });
  };

  const [roleStatus, setRoleStatus] = useState(providerHelpers.INITIAL_STATUS);
  const unsetRoleStatus = () => {
    setRoleStatus(providerHelpers.INITIAL_STATUS);
  };
  const patchRole = (id, requestBody) => {
    unsetRoleStatus();
    axios
      .patch(`users/promote/${id}`, requestBody)
      .then(res => {
        const updatedUserResponse = res.data.user;
        const updatedUsers = [...users];
        for (let i = 0; i < updatedUsers.length; i++) {
          if (updatedUsers[i]._id === id) {
            updatedUsers[i] = processUser(updatedUserResponse);
          }
        }
        setUsers(updatedUsers);
        providerHelpers.setSuccessStatus(setRoleStatus, 'User successfully promoted');
      })
      .catch(err => {
        const errorMsgResponse = err?.response?.data?.message || 'Connection error';
        providerHelpers.setErrorStatus(setRoleStatus, errorMsgResponse);
      });
  };

  const updateArrayWithNewUser = newUser => {
    const modifiedUsers = users.map(user => {
      if (user._id !== newUser._id) {
        return user;
      }
      return newUser;
    });
    setUsers(modifiedUsers);
  };

  // Set limit per page on render and widow resize
  useEffect(() => {
    if (width <= 2000) setLimitPerPage(LIMIT_1080P);
    if (width > 2000) setLimitPerPage(LIMIT_1440P);
    if (width > 2600) setLimitPerPage(LIMIT_4K);
  }, [width, height]);

  // When query is changed set page to 1
  useEffect(() => {
    setCurrentPage(INITIAL_USER_PAGE);
  }, [usersQuery]);

  // Fetch all users for admin and librarians
  useEffect(() => {
    if (!(auth.role === 'admin' || auth.role === 'librarian')) return;
    fetchAllUsers(currentPage);
  }, [auth, limitPerPage, usersQuery, currentPage]);

  useEffect(() => {setUsersQuery('')}, [auth])

  return (
    <UsersContext.Provider
      value={{
        currentPage,
        paginationData,
        setUsersQuery,
        setCurrentPage,

        users,
        allUsersStatus,
        unsetAllUsersStatus,

        getUserById,
        userByIdStatus,
        unsetUserByIdStatus,

        patchPersonalData,
        personalDataStatus,
        unsetPersonalDataStatus,

        patchAuthenticationData,
        authenticationDataStatus,
        unsetAuthenticationDataStatus,

        roleStatus,
        patchRole,
        unsetRoleStatus,

        updateArrayWithNewUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;

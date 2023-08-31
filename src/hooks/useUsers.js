import {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import UsersContext from 'providers/UsersProvider';
import processFormState from 'utils/processFormState';

const buildQuery = data => {
  let query = '';

  if (data.registrationDateFrom) query += `registrationDate[gte]=${data.registrationDateFrom}&`;
  if (data.registrationDateTo) query += `registrationDate[lte]=${data.registrationDateTo}&`;

  const roleArr = [];
  for (const [key, val] of Object.entries(data.role)) {
    if (val) roleArr.push(key);
  }
  if (roleArr.length > 0) query += `role=${roleArr.join(',')}&`;

  if (data.userSearchQuery) query += `search=${data.userSearchQuery}&`;

  return query.substring(0, query.length - 1);
};

const useUsers = () => {
  const {
    users,
    allUsersStatus,
    paginationData,
    setUsersQuery,
    setCurrentPage,
    usersFormState,
    setUsersFormState,
  } = useContext(UsersContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({defaultValues: usersFormState});
  const [userListError, setUserListError] = useState('');

  const onSubmit = data => {
    const query = buildQuery(data);
    setUsersQuery(query);
    setUserListError({
      ...userListError,
      formError: '',
    });
    setUsersFormState(data);
  };
  const onError = err => {
    setUserListError({
      ...userListError,
      formError: err,
    });
  };
  const submitWithPrevent = e => {
    e.preventDefault();
    handleSubmit(onSubmit, onError)();
  };
  const handleClearFields = fieldNames => {
    fieldNames.forEach(field => {
      setValue(field, null);
    });
  };
  const handlePageChange = newPage => {
    if (newPage > paginationData.totalPages || newPage < 1) return;
    setCurrentPage(newPage);
  };
  const handleRecordSelect = (e, setRoute) => {
    e.preventDefault();
    const id = e.currentTarget.id;
    setRoute(`/user/${id}`);
  };

  // Unset query on component mount
  // The query is also modified by manage borrowings view, so it needs to be unset
  useEffect(() => {
    setUsersQuery('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When component mounts set the values corresponding to those stored in provider
  useEffect(() => {
    const fieldList = processFormState(usersFormState);
    fieldList.forEach(field => {
      setValue(...field);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersFormState]);

  useEffect(() => {
    setUserListError({
      ...userListError,
      formError: errors,
      dataProviderError: allUsersStatus.error,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, allUsersStatus.error]);

  return {
    users,
    paginationData,
    register,
    userListError,
    handlePageChange,
    handleRecordSelect,
    handleClearFields,
    submitWithPrevent,
  };
};

export default useUsers;

import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import UsersContext from 'providers/UsersProvider';

const buildQuery = (data) => {
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

const useUsers = (initialFormValues) => {
  const { register, handleSubmit, setValue, formState: {errors} } = useForm({ defaultValues: initialFormValues });
  const { users, allUsersStatus, paginationData, setUsersQuery, setCurrentPage } = useContext(UsersContext);
  const [userListError, setUserListError] = useState('');
  const onSubmit = (data) => {
    const query = buildQuery(data);
    setUsersQuery(query);
    setUserListError({
      ...userListError,
      formError: '',
    });
  };
  const onError = (err) => {
    setUserListError({
      ...userListError,
      formError: err,
    });
  };
  const submitWithPrevent = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit, onError)();
  };

  const handleClearFields = (fieldNames) => {
    fieldNames.forEach((field) => {
      setValue(field, null);
    });
  };
  const handlePageChange = (newPage) => {
    if (newPage > paginationData.totalPages || newPage < 1) return;
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setUserListError({
      ...userListError,
      formError: errors,
      dataProviderError: userListError.error,
    })
  }, [errors, allUsersStatus.error])

  return { users, paginationData, register, userListError, handlePageChange, handleClearFields, submitWithPrevent };
};

export default useUsers;

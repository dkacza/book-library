import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import UsersContext from 'providers/UsersProvider';

const buildQuery = (data) => {
  let query = '';
  // Registration date
  if (data.registrationDateFrom) query += `registrationDate[gte]=${data.registrationDateFrom}&`;
  if (data.registrationDateTo) query += `registrationDate[lte]=${data.registrationDateTo}&`;
  // Roles
  const roleArr = [];
  for (const [key, val] of Object.entries(data.role)) {
    if (val) roleArr.push(key);
  }
  if (roleArr.length > 0) query += `role=${roleArr.join(',')}&`;
  // Search query
  if (data.userSearchQuery) query += `search=${data.userSearchQuery}&`;

  return query.substring(0, query.length - 1);
};

const useUsers = (initialFormValues) => {
  const { register, handleSubmit, reset } = useForm({ defaultValues: initialFormValues });
  const { users, currentPage, paginationData, errorMsg, setUsersQuery, setCurrentPage } = useContext(UsersContext);
  const onSubmit = (data) => {
    const query = buildQuery(data);
    setUsersQuery(query);
  };
  const onError = (err) => {
    reset();
  };
  const submitWithPrevent = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit, onError)();
  };
  const handlePageChange = (newPage) => {
    if (newPage > paginationData.totalPages || newPage < 1) return
    setCurrentPage(newPage);
  };

  return { users, paginationData, register, handlePageChange, submitWithPrevent };
};

export default useUsers;

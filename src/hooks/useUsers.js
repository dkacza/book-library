import useWindowDimensions from 'hooks/useWindowDimensions';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'api/axios';

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

const prepareObject = (obj, columnCodes) => {
  if (obj.firstName && obj.lastName) {
    obj.fullName = obj.firstName + ' ' + obj.lastName;
  }
  // Fix dates
  for (const [key, val] of Object.entries(obj)) {
    if (!key.endsWith('Date')) continue;
    obj[key] = val.substring(0, 10);
  }
  return obj;
};

const useUsers = (initialFormValues, initialPage, columnCodes) => {
  const { width } = useWindowDimensions();
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState({});
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [query, setQuery] = useState(buildQuery(initialFormValues));

  const { register, handleSubmit, reset } = useForm({ defaultValues: initialFormValues });

  const fetchUsers = (page, limit) => {
    console.log(query);
    axios.get(`users/?${query}&page=${page}&limit=${limit}`).then((res) => {
      const users = res.data.data.users.map((user) => prepareObject(user, columnCodes));
      const pagination = res.data.data.pagination;
      setUsers(users);
      setPages(pagination);
    });
  };
  const onSubmit = (data) => {
    const query = buildQuery(data);
    setQuery(query);

  };
  const onError = (err) => {
    reset();
  };
  const submitWithPrevent = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit, onError)();
  };
  const handlePageChange = (newPage) => {
    if (newPage > pages.totalPages || newPage < 1) {
      return;
    }
    fetchUsers(newPage, limitPerPage);
  };

  useEffect(() => {
    if (width <= 2000) setLimitPerPage(10);
    if (width > 2000) setLimitPerPage(15);
    if (width > 2600) setLimitPerPage(20);
  }, [width]);

  useEffect(() => {
    fetchUsers(initialPage, limitPerPage);
  }, [limitPerPage, query]);

  return { users, pages, register, handlePageChange, submitWithPrevent };
};

export default useUsers;

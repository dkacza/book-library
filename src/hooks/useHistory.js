import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import BorrowingsContext from 'providers/BorrowingsProvider';

const buildQuery = (data) => {
  let query = '';

  if (data.startDateFrom) query += `startDate[gte]=${data.startDateFrom}&`;
  if (data.startDateTo) query += `startDate[lte]=${data.startDateTo}&`;
  if (data.returnDateFrom) query += `returnDate[gte]=${data.returnDateFrom}&`;
  if (data.returnDateTo) query += `returnDate[lte]=${data.returnDateTo}&`;

  const statusArr = [];
  for (const [key, val] of Object.entries(data.status)) {
    if (val) statusArr.push(key);
  }
  if (statusArr.length > 0) query += `currentStatus=${statusArr.join(',')}&`;

  if (data.bookSearchQuery) query += `bookSearch=${data.bookSearchQuery}&`;
  if (data.userSearchQuery) query += `userSearch=${data.userSearchQuery}&`;

  return query.substring(0, query.length - 1);
};

const useHistory = (initialFormValues) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: initialFormValues });
  const { history, borrowingsListStatus, paginationData, authorizedHistory, setHistoryQuery, setCurrentPage } =
    useContext(BorrowingsContext);
  const [historyError, setHistoryError] = useState({});

  const onSubmit = (data) => {
    const query = buildQuery(data);
    setHistoryQuery(query);
    setHistoryError({
      ...historyError,
      formError: '',
    });
  };
  const onError = (err) => {
    setHistoryError({
      ...historyError,
      formError: err,
    });
  };
  const submitWithPrevent = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit, onError)();
  };
  const handlePageChange = (newPage) => {
    if (newPage > paginationData.totalPages || newPage < 1) return;
    setCurrentPage(newPage);
  };
  const handleClearFields = (fieldNames) => {
    fieldNames.forEach((field) => {
      setValue(field, null);
    });
  };

  useEffect(() => {
    setHistoryError({
      ...historyError,
      formError: errors,
      dataProviderError: borrowingsListStatus.error,
    });
  }, [errors, borrowingsListStatus.error]);

  return {
    authorizedHistory,
    history,
    paginationData,
    register,
    handlePageChange,
    handleClearFields,
    submitWithPrevent,
    historyError,
  };
};

export default useHistory;
